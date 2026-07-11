"""ATMAN admin backend tests — username-based login (iteration 3)."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://atman-events.preview.emergentagent.com').rstrip('/')
ADMIN_USERNAME = "Ashutosh12"
ADMIN_PASSWORD = "Ashutosh12"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def token(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data and data["username"] == ADMIN_USERNAME and data["role"] == "admin"
    return data["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---------- Public ----------
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200


def test_public_settings(api):
    r = api.get(f"{BASE_URL}/api/settings")
    assert r.status_code == 200
    assert "email" in r.json()


def test_public_videos(api):
    r = api.get(f"{BASE_URL}/api/videos")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Auth ----------
def test_login_success(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    body = r.json()
    assert body["username"] == ADMIN_USERNAME
    assert body["role"] == "admin"
    assert isinstance(body["token"], str) and len(body["token"]) > 10


def test_login_wrong_password(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"username": ADMIN_USERNAME, "password": "wrongpass"})
    assert r.status_code == 401
    assert "Invalid username or password" in r.json().get("detail", "")


def test_login_wrong_username(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"username": "nobody", "password": "whatever"})
    assert r.status_code == 401


# ---------- The core bug fix ----------
def test_admin_me_with_token(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/admin/me", headers=auth_headers)
    assert r.status_code == 200, f"Regression: /admin/me returned {r.status_code} — {r.text}"
    body = r.json()
    assert body["username"] == ADMIN_USERNAME
    assert body["role"] == "admin"


def test_admin_bookings_with_token(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/admin/bookings", headers=auth_headers)
    assert r.status_code == 200, f"Regression: /admin/bookings returned {r.status_code} — {r.text}"
    assert isinstance(r.json(), list)


def test_admin_bookings_no_token(api):
    r = api.get(f"{BASE_URL}/api/admin/bookings")
    assert r.status_code == 401


# ---------- Settings ----------
def test_update_settings(api, auth_headers):
    payload = {
        "email": "hello@atmanmusic.co",
        "phone": "+91 · placeholder",
        "location": "Mumbai · India · Available worldwide",
        "instagram": "", "youtube": "", "spotify": "", "whatsapp": "",
        "hero_tagline": "Music That Touches The Soul",
        "hero_subline": "Luxury Live Music",
    }
    r = api.put(f"{BASE_URL}/api/admin/settings", headers=auth_headers, json=payload)
    assert r.status_code == 200, r.text
    assert r.json()["email"] == payload["email"]

    # Persistence check
    r2 = api.get(f"{BASE_URL}/api/settings")
    assert r2.status_code == 200
    assert r2.json()["hero_tagline"] == payload["hero_tagline"]


# ---------- Videos CRUD ----------
def test_video_crud(api, auth_headers):
    create = api.post(f"{BASE_URL}/api/admin/videos", headers=auth_headers,
                      json={"youtube_id": "TEST_abc123", "title": "TEST_Video", "subtitle": "TEST", "order": 99})
    assert create.status_code == 201, create.text
    vid = create.json()
    video_id = vid["id"]
    assert vid["title"] == "TEST_Video"

    # GET verify persistence via public list
    listing = api.get(f"{BASE_URL}/api/videos").json()
    assert any(v["id"] == video_id for v in listing)

    # Update
    upd = api.put(f"{BASE_URL}/api/admin/videos/{video_id}", headers=auth_headers,
                  json={"youtube_id": "TEST_abc123", "title": "TEST_Video_Updated", "subtitle": "TEST", "order": 99})
    assert upd.status_code == 200
    assert upd.json()["title"] == "TEST_Video_Updated"

    # Delete
    dele = api.delete(f"{BASE_URL}/api/admin/videos/{video_id}", headers=auth_headers)
    assert dele.status_code == 200

    # Verify removed
    listing2 = api.get(f"{BASE_URL}/api/videos").json()
    assert not any(v["id"] == video_id for v in listing2)


# ---------- Public booking creation ----------
def test_public_booking_create(api):
    r = api.post(f"{BASE_URL}/api/bookings", json={
        "name": "TEST_User",
        "email": "test_atman@example.com",
        "phone": "+911234567890",
        "event_type": "Wedding",
        "message": "TEST inquiry",
    })
    assert r.status_code == 201, r.text
    assert r.json()["email"] == "test_atman@example.com"
