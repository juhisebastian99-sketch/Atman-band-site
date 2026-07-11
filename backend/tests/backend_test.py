"""ATMAN backend tests — admin auth, settings, videos, bookings."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://atman-events.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "admin@atman.co"
ADMIN_PASSWORD = "Atman@2026"


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data and data["email"] == ADMIN_EMAIL and data["role"] == "admin"
    return data["token"]


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Auth ----------
class TestAuth:
    def test_login_wrong_password(self):
        r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=15)
        assert r.status_code == 401

    def test_me_valid(self, auth_headers):
        r = requests.get(f"{API}/admin/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        j = r.json()
        assert j["email"] == ADMIN_EMAIL and j["role"] == "admin"

    def test_me_no_token(self):
        r = requests.get(f"{API}/admin/me", timeout=15)
        assert r.status_code == 401

    def test_me_invalid_token(self):
        r = requests.get(f"{API}/admin/me", headers={"Authorization": "Bearer abc.def.ghi"}, timeout=15)
        assert r.status_code == 401


# ---------- Settings ----------
class TestSettings:
    def test_get_public_settings(self):
        r = requests.get(f"{API}/settings", timeout=15)
        assert r.status_code == 200
        j = r.json()
        for k in ["email", "phone", "location", "instagram", "youtube", "spotify", "whatsapp", "hero_tagline", "hero_subline"]:
            assert k in j

    def test_put_settings_no_auth(self):
        r = requests.put(f"{API}/admin/settings", json={}, timeout=15)
        assert r.status_code == 401

    def test_put_settings_and_persist(self, auth_headers):
        # get current
        cur = requests.get(f"{API}/settings", timeout=15).json()
        new_phone = f"+91-TEST-{uuid.uuid4().hex[:6]}"
        payload = {**cur, "phone": new_phone, "instagram": "https://instagram.com/atman_test"}
        r = requests.put(f"{API}/admin/settings", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        assert r.json()["phone"] == new_phone
        # verify persistence
        got = requests.get(f"{API}/settings", timeout=15).json()
        assert got["phone"] == new_phone
        assert got["instagram"] == "https://instagram.com/atman_test"
        # restore
        requests.put(f"{API}/admin/settings", json=cur, headers=auth_headers, timeout=15)


# ---------- Videos ----------
class TestVideos:
    created_ids = []

    def test_public_list_videos_sorted(self):
        r = requests.get(f"{API}/videos", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        orders = [it["order"] for it in items]
        assert orders == sorted(orders)

    def test_create_video_no_auth(self):
        r = requests.post(f"{API}/admin/videos", json={"youtube_id": "abc123", "title": "x"}, timeout=15)
        assert r.status_code == 401

    def test_video_crud(self, auth_headers):
        # CREATE
        payload = {"youtube_id": "TESTyt_" + uuid.uuid4().hex[:6], "title": "TEST_Video", "subtitle": "sub", "order": 99}
        r = requests.post(f"{API}/admin/videos", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 201, r.text
        v = r.json()
        vid = v["id"]
        assert v["title"] == "TEST_Video"
        assert "created_at" in v
        TestVideos.created_ids.append(vid)

        # GET verifies persist
        listing = requests.get(f"{API}/videos", timeout=15).json()
        assert any(it["id"] == vid for it in listing)

        # UPDATE
        upd = {**payload, "title": "TEST_Video_Updated", "order": 100}
        r2 = requests.put(f"{API}/admin/videos/{vid}", json=upd, headers=auth_headers, timeout=15)
        assert r2.status_code == 200, r2.text
        assert r2.json()["title"] == "TEST_Video_Updated"

        listing = requests.get(f"{API}/videos", timeout=15).json()
        found = [it for it in listing if it["id"] == vid]
        assert found and found[0]["title"] == "TEST_Video_Updated"

        # DELETE
        r3 = requests.delete(f"{API}/admin/videos/{vid}", headers=auth_headers, timeout=15)
        assert r3.status_code == 200
        listing = requests.get(f"{API}/videos", timeout=15).json()
        assert not any(it["id"] == vid for it in listing)

    def test_update_video_404(self, auth_headers):
        r = requests.put(f"{API}/admin/videos/does-not-exist", json={"youtube_id": "aaa", "title": "x", "subtitle": "", "order": 0}, headers=auth_headers, timeout=15)
        assert r.status_code == 404

    def test_delete_video_404(self, auth_headers):
        r = requests.delete(f"{API}/admin/videos/does-not-exist", headers=auth_headers, timeout=15)
        assert r.status_code == 404


# ---------- Bookings & Admin bookings list ----------
class TestBookings:
    def test_create_booking_and_admin_list(self, auth_headers):
        payload = {
            "name": "TEST User",
            "email": "test@example.com",
            "phone": "+911234567890",
            "event_type": "Wedding",
            "event_date": "2026-05-01",
            "guest_count": "200",
            "location": "Mumbai",
            "message": "TEST inquiry",
        }
        r = requests.post(f"{API}/bookings", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        b = r.json()
        assert b["name"] == "TEST User" and "id" in b

        r2 = requests.get(f"{API}/admin/bookings", headers=auth_headers, timeout=15)
        assert r2.status_code == 200
        items = r2.json()
        assert any(it["id"] == b["id"] for it in items)

    def test_admin_bookings_no_auth(self):
        r = requests.get(f"{API}/admin/bookings", timeout=15)
        assert r.status_code == 401
