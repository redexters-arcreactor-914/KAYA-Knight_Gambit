# """
# Crime Classification — TF-IDF + Logistic Regression.

# Takes the free-text description an FIR officer types and suggests a
# crime_type category, so the officer doesn't have to pick from a dropdown
# manually — they can confirm or override the suggestion.

# HONEST CAVEAT (put this in the README / say it upfront to judges):
# This is trained on ~30 synthetic example sentences we wrote ourselves
# (crime_training_data.json), not on real FIR records. With that few examples
# per category and vocabulary that barely overlaps between categories, TF-IDF
# finds near-perfect separating keywords trivially — hence the ~100% training
# accuracy. That number does NOT mean the model generalizes to real-world FIR
# language, which is messier, less templated, and has overlapping vocabulary
# across crime types. In a real deployment this would need to be retrained on
# a much larger set of actual (anonymized) FIR text before the accuracy number
# means anything. We're including this model to demonstrate the pipeline
# (text -> TF-IDF -> classifier -> suggested category), not to claim
# production-grade accuracy.

# Run standalone to test: python -m app.ml.crime_classifier
# Used by: POST /reports/crime/suggest-category (reports_router.py)
# """
# import json
# from pathlib import Path
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.linear_model import LogisticRegression
# from sklearn.model_selection import cross_val_score

# TRAINING_DATA_PATH = Path(__file__).parent / "crime_training_data.json"

# _vectorizer = None
# _model = None


# def _load_training_data():
#     with open(TRAINING_DATA_PATH) as f:
#         return json.load(f)


# def train():
#     """Trains and caches the model in memory. Called once at server startup."""
#     global _vectorizer, _model
#     data = _load_training_data()
#     texts = [d["text"] for d in data]
#     labels = [d["crime_type"] for d in data]

#     _vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
#     X = _vectorizer.fit_transform(texts)

#     _model = LogisticRegression(max_iter=1000)
#     _model.fit(X, labels)
#     return _model, _vectorizer


# def suggest_category(description: str, top_k: int = 3):
#     global _vectorizer, _model
#     if _model is None or _vectorizer is None:
#         train()

#     X = _vectorizer.transform([description])
#     probs = _model.predict_proba(X)[0]
#     classes = _model.classes_
#     ranked = sorted(zip(classes, probs), key=lambda x: x[1], reverse=True)[:top_k]
#     return [{"crime_type": c, "confidence": round(float(p), 4)} for c, p in ranked]


# def evaluate_honest_accuracy():
#     """
#     5-fold cross-validation accuracy — still inflated due to tiny dataset,
#     but slightly more honest than plain training accuracy since it at least
#     holds out folds. Use this number when asked, with the caveat above.
#     """
#     data = _load_training_data()
#     texts = [d["text"] for d in data]
#     labels = [d["crime_type"] for d in data]
#     vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
#     X = vectorizer.fit_transform(texts)
#     model = LogisticRegression(max_iter=1000)
#     scores = cross_val_score(model, X, labels, cv=3)
#     return round(float(scores.mean()), 4)


# if __name__ == "__main__":
#     train()
#     print("Cross-validated accuracy (see honest caveat in module docstring):", evaluate_honest_accuracy())
#     print()
#     test_descriptions = [
#         "large quantity of heroin found hidden in truck during checkpoint inspection",
#         "businessman received threatening call demanding money for protection",
#         "victim's son taken from school, ransom demanded over phone",
#     ]
#     for desc in test_descriptions:
#         print(f"'{desc[:60]}...'")
#         for r in suggest_category(desc):
#             print(f"    {r['crime_type']:20s} {r['confidence']:.4f}")
#         print()


"""
Crime Classification — TF-IDF + Logistic Regression.

Takes the free-text description an FIR officer types and suggests a
crime_type category, so the officer doesn't have to pick from a dropdown
manually — they can confirm or override the suggestion.

CHANGES FROM THE ORIGINAL VERSION (fixing a real review finding):
The old evaluate_honest_accuracy() called `vectorizer.fit_transform(texts)`
on the WHOLE dataset, then ran cross_val_score on the resulting matrix.
That's leakage: the TF-IDF vocabulary and IDF weights were learned from
every fold, including the ones later held out as "validation" — so each
fold's held-out score still benefited from vocabulary the model shouldn't
have seen yet. Fixed by wrapping the vectorizer and classifier in a single
sklearn Pipeline, and running cross-validation on that pipeline directly —
scikit-learn then refits the vectorizer fresh inside each fold.

Also fixed: the docstring previously said "5-fold" while the code used
cv=3 — they now agree (3-fold, documented below, chosen because our
smallest class has only 3 examples and StratifiedKFold needs at least that
many folds' worth of samples per class).

HONEST CAVEAT (put this in the README / say it upfront to judges):
This is trained on ~30 synthetic example sentences we wrote ourselves
(crime_training_data.json), not on real FIR records. With that few examples
per category and vocabulary that barely overlaps between categories, TF-IDF
finds near-perfect separating keywords trivially — hence a very high
training accuracy. That number does NOT mean the model generalizes to
real-world FIR language, which is messier, less templated, and has
overlapping vocabulary across crime types. The Pipeline-based 3-fold CV
score below is a more honest number, but is still measured on a tiny
dataset — treat it as a pipeline demonstration, not a production accuracy
claim. In a real deployment this needs retraining on a much larger set of
actual (anonymized) FIR text.

NOTE for whoever wires this into reports_router.py: suggest_category()
still returns a plain ranked list of {"crime_type", "confidence"} dicts —
same shape as before, so nothing else needs to change to use this file.
If you want a "no confident suggestion — pick manually" UI behavior when
the top confidence is low, that's a caller-side check (e.g.
`if suggestions[0]["confidence"] < 0.4`) — deliberately not baked in here
so this function's return type doesn't change for existing callers.

Run standalone to test: python -m app.ml.crime_classifier
Used by: POST /reports/crime/suggest-category (reports_router.py)
"""
import json
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import StratifiedKFold, cross_val_score, cross_val_predict
from sklearn.metrics import classification_report

TRAINING_DATA_PATH = Path(__file__).parent / "crime_training_data.json"
N_SPLITS = 3  # limited by our smallest class (3 examples) — see docstring

_pipeline = None


def _load_training_data():
    with open(TRAINING_DATA_PATH) as f:
        return json.load(f)


def _build_pipeline():
    """A fresh, unfit pipeline — used both for the real model and for each
    fold during cross-validation, so the vectorizer always refits on
    training data only."""
    return make_pipeline(
        TfidfVectorizer(stop_words="english", ngram_range=(1, 2)),
        LogisticRegression(max_iter=1000, class_weight="balanced"),
    )


def train():
    """Trains and caches the pipeline in memory. Called once at server startup."""
    global _pipeline
    data = _load_training_data()
    texts = [d["text"] for d in data]
    labels = [d["crime_type"] for d in data]

    _pipeline = _build_pipeline()
    _pipeline.fit(texts, labels)
    return _pipeline


def suggest_category(description: str, top_k: int = 3):
    global _pipeline
    if _pipeline is None:
        train()

    probs = _pipeline.predict_proba([description])[0]
    classes = _pipeline.classes_
    ranked = sorted(zip(classes, probs), key=lambda x: x[1], reverse=True)[:top_k]
    return [{"crime_type": c, "confidence": round(float(p), 4)} for c, p in ranked]


def evaluate_honest_accuracy():
    """
    Stratified {N_SPLITS}-fold cross-validation accuracy, with the
    TfidfVectorizer refitting INSIDE each fold via the Pipeline — see the
    module docstring for why this fixes a real leakage bug in the previous
    version. Still inflated by the tiny, clean synthetic dataset; use with
    the honest caveat above, not as a production accuracy claim.
    """
    data = _load_training_data()
    texts = [d["text"] for d in data]
    labels = [d["crime_type"] for d in data]

    pipeline = _build_pipeline()
    cv = StratifiedKFold(n_splits=N_SPLITS, shuffle=True, random_state=42)
    scores = cross_val_score(pipeline, texts, labels, cv=cv)
    return round(float(scores.mean()), 4)


def evaluate_per_class():
    """
    Per-class precision/recall/F1 from cross-validated predictions.
    Accuracy alone is close to meaningless on a small, imbalanced,
    multi-class problem — a model can look "accurate" overall while
    failing completely on the smaller classes. This is the number to put
    in the notebook/deck instead of (or alongside) plain accuracy.
    """
    data = _load_training_data()
    texts = [d["text"] for d in data]
    labels = [d["crime_type"] for d in data]

    pipeline = _build_pipeline()
    cv = StratifiedKFold(n_splits=N_SPLITS, shuffle=True, random_state=42)
    preds = cross_val_predict(pipeline, texts, labels, cv=cv)
    return classification_report(labels, preds, zero_division=0)


if __name__ == "__main__":
    train()
    print(f"{N_SPLITS}-fold cross-validated accuracy (Pipeline-based, no leakage):", evaluate_honest_accuracy())
    print()
    print("Per-class precision/recall/F1:")
    print(evaluate_per_class())
    print()
    test_descriptions = [
        "large quantity of heroin found hidden in truck during checkpoint inspection",
        "businessman received threatening call demanding money for protection",
        "victim's son taken from school, ransom demanded over phone",
        "completely unrelated text about weather patterns in the region",
    ]
    for desc in test_descriptions:
        print(f"'{desc[:60]}...'")
        for r in suggest_category(desc):
            print(f"    {r['crime_type']:20s} {r['confidence']:.4f}")
        print()
