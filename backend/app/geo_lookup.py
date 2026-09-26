
import hashlib

CITY_COORDS = {
    "lyari": (24.8600, 66.9800),
    "karachi": (24.8607, 67.0011),
    "islamabad": (33.6844, 73.0479),
    "rawalpindi": (33.5651, 73.0169),
    "lahore": (31.5497, 74.3436),
    "peshawar": (34.0151, 71.5249),
    "quetta": (30.1798, 66.9750),
    "mumbai": (19.0760, 72.8777),
    "andheri": (19.1197, 72.8468),
    "dharavi": (19.0430, 72.8570),
    "patna": (25.5941, 85.1376),
    "katni": (23.8330, 80.3950),
    "delhi": (28.6139, 77.2090),
    "new delhi": (28.6139, 77.2090),
    "lucknow": (26.8467, 80.9462),
    "kabul": (34.5553, 69.2075),
    "kandahar": (31.6289, 65.7372),
    "torkham": (34.1042, 71.0575),
    "kathmandu": (27.7172, 85.3240),
    "dhaka": (23.8103, 90.4125),
    "new york": (40.7128, -74.0060),
    "miami": (25.7617, -80.1918),
    "san francisco": (37.7749, -122.4194),
        "bastar": (19.0748, 82.0165),
    "jagdalpur": (19.0748, 82.0165),
    "dantewada": (18.8991, 81.3450),
    "gadchiroli": (20.1809, 80.0021),
    "malkangiri": (18.3459, 81.8791),
    "raipur": (21.2514, 81.6296),
    "ranchi": (23.3441, 85.3096),
    "nagpur": (21.1458, 79.0882),
    "medellin": (6.2442, -75.5812),
    "cali": (3.4516, -76.5320),
    "tijuana": (32.5149, -117.0382),
    "culiacan": (24.8091, -107.3940),
    "ciudad juarez": (31.6904, -106.4245),
    "madrid": (40.4168, -3.7038),
    "rotterdam": (51.9244, 4.4777)
}

COUNTRY_COORDS = {
    "india": (22.3511, 78.6677),
    "pakistan": (30.3753, 69.3451),
    "afghanistan": (33.9391, 67.7100),
    "usa": (39.8283, -98.5795),
    "nepal": (28.3949, 84.1240),
    "bangladesh": (23.6850, 90.3563),
        "colombia": (4.5709, -74.2973),
    "mexico": (23.6345, -102.5528),
    "spain": (40.4637, -3.7492),
    "netherlands": (52.1326, 5.2913)
}


def resolve_coordinates(base_location, country_base):
    """Prefer the city-level base_location; fall back to country centroid."""
    if base_location:
        hit = CITY_COORDS.get(base_location.strip().lower())
        if hit:
            return hit
    if country_base:
        hit = COUNTRY_COORDS.get(country_base.strip().lower())
        if hit:
            return hit
    return None


def jitter(entity_id, lat, lng, spread=0.12):
    """
    Deterministic small offset so multiple suspects at the same city don't
    render as one overlapping pin. Same entity always gets the same offset
    (hash-based, not random), so pins don't jump around on reload.
    """
    h = int(hashlib.md5(entity_id.encode()).hexdigest(), 16)
    dlat = ((h % 1000) / 1000 - 0.5) * spread
    dlng = (((h // 1000) % 1000) / 1000 - 0.5) * spread
    return lat + dlat, lng + dlng
