"""ATMAN backend API tests — settings, videos, bookings, admin auth + CRUD."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://atman-events.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_USERNAME = "Ashutosh12"
ADMIN_PASSWORD = "Ashutosh@12"
OLD_ADMIN_PASSWORD = "Ashutosh12"


@pytest.fixture(scope="session")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


@pytest.fixture(scope="session")
def token(s):
    r = s.post(f"{API}/admin/login", json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    return r.json()["token"]


@pytest.fixture(scope="session")
def auth(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Public endpoints ----------
def test_get_settings_public(s):
    r = s.get(f"{API}/settings", timeout=15)
    assert r.status_code == 200
    data = r.json()
    for k in ["email", "phone", "location", "hero_tagline", "hero_subline"]:
        assert k in data


def test_get_videos_public(s):
    r = s.get(f"{API}/videos", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 3
    for v in data:
        assert "youtube_id" in v and "title" in v and "id" in v


# ---------- Bookings ----------
def test_create_booking_valid(s):
    payload = {
        "name": "TEST_Booking User",
        "email": "test.booking@example.com",
        "phone": "+911234567890",
        "event_type": "Wedding",
        "message": "TEST inquiry"
    }
    r = s.post(f"{API}/bookings", json=payload, timeout=15)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data and "created_at" in data
    pytest.booking_id = data["id"]


def test_create_booking_invalid_email(s):
    payload = {
        "name": "TEST X",
        "email": "not-an-email",
        "phone": "+911234567890",
        "event_type": "Wedding",
    }
    r = s.post(f"{API}/bookings", json=payload, timeout=15)
    assert r.status_code == 422


# ---------- Admin auth ----------
def test_admin_login_success(s):
    r = s.post(f"{API}/admin/login", json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "token" in data and data["username"] == ADMIN_USERNAME and data["role"] == "admin"


def test_admin_login_wrong_password(s):
    r = s.post(f"{API}/admin/login", json={"username": ADMIN_USERNAME, "password": "wrong"}, timeout=15)
    assert r.status_code == 401


def test_admin_login_old_password_rejected(s):
    """Old password Ashutosh12 (without @) must be rejected after password change."""
    r = s.post(f"{API}/admin/login", json={"username": ADMIN_USERNAME, "password": OLD_ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 401, f"Old password unexpectedly accepted: {r.status_code} {r.text}"


def test_admin_me_with_token(s, auth):
    r = s.get(f"{API}/admin/me", headers=auth, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["username"] == ADMIN_USERNAME
    assert data["role"] == "admin"


def test_admin_me_without_token():
    r = requests.get(f"{API}/admin/me", timeout=15)
    assert r.status_code in (401, 403)


# ---------- Admin bookings ----------
def test_admin_list_bookings_contains_new(s, auth):
    r = s.get(f"{API}/admin/bookings", headers=auth, timeout=15)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    ids = [b["id"] for b in items]
    assert getattr(pytest, "booking_id", None) in ids


# ---------- Admin settings ----------
def test_admin_update_settings(s, auth):
    marker = f"TEST_{uuid.uuid4().hex[:6]}"
    new_settings = {
        "email": f"{marker}@atmanmusic.co",
        "phone": "+91 99999 00000",
        "location": "Mumbai Test",
        "instagram": "https://instagram.com/atman",
        "youtube": "",
        "spotify": "",
        "whatsapp": "+919999900000",
        "hero_tagline": "Test tagline",
        "hero_subline": "Test subline"
    }
    r = s.put(f"{API}/admin/settings", headers=auth, json=new_settings, timeout=15)
    assert r.status_code == 200, r.text
    assert r.json()["email"] == new_settings["email"]

    # verify via public
    g = s.get(f"{API}/settings", timeout=15)
    assert g.status_code == 200
    assert g.json()["email"] == new_settings["email"]


# ---------- Admin videos CRUD ----------
def test_admin_video_full_crud(s, auth):
    # create
    payload = {"youtube_id": "TEST_yid1", "title": "TEST Video", "subtitle": "TEST sub", "order": 99}
    r = s.post(f"{API}/admin/videos", headers=auth, json=payload, timeout=15)
    assert r.status_code == 201, r.text
    v = r.json()
    vid = v["id"]
    assert v["title"] == "TEST Video"

    # verify in public list
    lst = s.get(f"{API}/videos", timeout=15).json()
    assert any(x["id"] == vid for x in lst)

    # update
    upd = {"youtube_id": "TEST_yid2", "title": "TEST Video Updated", "subtitle": "sub2", "order": 100}
    r2 = s.put(f"{API}/admin/videos/{vid}", headers=auth, json=upd, timeout=15)
    assert r2.status_code == 200, r2.text
    assert r2.json()["title"] == "TEST Video Updated"

    lst2 = s.get(f"{API}/videos", timeout=15).json()
    matched = [x for x in lst2 if x["id"] == vid]
    assert matched and matched[0]["youtube_id"] == "TEST_yid2"

    # delete
    r3 = s.delete(f"{API}/admin/videos/{vid}", headers=auth, timeout=15)
    assert r3.status_code == 200

    lst3 = s.get(f"{API}/videos", timeout=15).json()
    assert not any(x["id"] == vid for x in lst3)


def test_admin_video_requires_auth(s):
    r = s.post(f"{API}/admin/videos", json={"youtube_id": "x", "title": "y"}, timeout=15)
    assert r.status_code in (401, 403)
