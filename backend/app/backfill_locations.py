"""

Run once: python -m app.backfill_locations
"""
from .database import SessionLocal
from . import models

# entity_id -> city/area name (must match a key in geo_lookup.CITY_COORDS,
# lowercase-insensitive)
LOCATIONS = {
    "hamza_mazari": "Karachi",
    "ajay_sanyal": "New Delhi",
    "sushant_bansal": "New Delhi",
    "sanjay_kumar": "Lucknow",
    "mohammed_aalam": "Lyari",
    "neha_pawar": "New Delhi",
    "major_iqbal": "Rawalpindi",
    "shamshad_hassan": "Rawalpindi",
    "brigadier_jahangir": "Rawalpindi",
    "aquib_zarwari": "Islamabad",
    "chaudhary_aslam": "Karachi",
    "omar_haider": "Karachi",
    "bade_sahab": "Karachi",
    "uzair_baloch": "Lyari",
    "arshad_pappu": "Lyari",
    "rehman_dakait": "Lyari",
    "javed_khanani": "Karachi",
    "sajid_mir": "Lahore",
    "gurbaaz_singh": "Lahore",
    "ashfaq_ahmed": "Lyari",
    "yalina_jamali": "Islamabad",
    "jameel_jamali": "Islamabad",
    "ulfat": "Lyari",
    "ahmad_shah": "Kandahar",
    "zalmay_khan": "Kandahar",
    "tariq_wafa": "Torkham",
    "david_sterling": "New York",
    "sarah_jenkins": "San Francisco",
    "john_russo": "Miami",
    "lawyer_veena": "New Delhi",
    "nawab_shafiq": "Islamabad",
    "hitika_bali": "Mumbai",
    "ehsanullah_barkat": "Quetta",
    "usman_barkat": "Quetta",
    "rafiq_sherwani": "Lahore",
    "haroon_qureshi": "Lahore",
    "yasir_mahmood": "Lahore",
    "nasir_baig": "Karachi",
    "salman_rauf": "Quetta",
    "aslam_qadri": "Peshawar",
    "bilal_farooqi": "Kandahar",
    "noor_e_khidmat": "Lahore",
    "insaan_dost_trust": "Lahore",
    "awami_ittehad": "Islamabad",
    "rashid_somji": "Karachi",
    "farhan_noorani": "Kathmandu",
    "kamal_haque": "Dhaka",
    "priya_deshmukh": "Mumbai",
}


def run():
    db = SessionLocal()
    updated = 0
    skipped_has_value = 0
    skipped_not_found = 0

    for entity_id, city in LOCATIONS.items():
        entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
        if not entity:
            skipped_not_found += 1
            continue
        if entity.base_location:
            skipped_has_value += 1
            continue
        entity.base_location = city
        updated += 1

    db.commit()
    db.close()
    print(f"Backfilled: {updated}")
    print(f"Skipped (already had a location): {skipped_has_value}")
    print(f"Skipped (id not found in this database): {skipped_not_found}")


if __name__ == "__main__":
    run()
