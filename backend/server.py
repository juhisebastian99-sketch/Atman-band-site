from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

# ---------- Config ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALG = "HS256"
TOKEN_EXPIRY_DAYS = 7

ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@atman.co').lower().strip()
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Atman@2026')

app = FastAPI(title="ATMAN Live Music API")
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)


# ---------- Password / JWT helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), hashed.encode())
    except Exception:
        return False


def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(days=TOKEN_EXPIRY_DAYS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def require_admin(creds: HTTPAuthorizationCredentials = Depends(security)):
    if not creds or not creds.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALG])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Forbidden")
        user = await db.admin_users.find_one({"email": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return {"email": payload["sub"], "role": "admin"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
class BookingInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=32)
    event_type: str = Field(..., min_length=2, max_length=64)
    event_date: Optional[str] = None
    guest_count: Optional[str] = None
    location: Optional[str] = Field(default=None, max_length=200)
    message: Optional[str] = Field(default=None, max_length=2000)


class BookingInquiry(BookingInquiryCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LoginPayload(BaseModel):
    email: EmailStr
    password: str


class SiteSettings(BaseModel):
    email: str = "hello@atmanmusic.co"
    phone: str = "+91 · placeholder"
    location: str = "Mumbai · India · Available worldwide"
    instagram: str = ""
    youtube: str = ""
    spotify: str = ""
    whatsapp: str = ""
    hero_tagline: str = "Music That Touches The Soul"
    hero_subline: str = "Luxury Live Music for Weddings, Destination Weddings, Corporate Events & Private Celebrations."


class VideoCreate(BaseModel):
    youtube_id: str = Field(..., min_length=3, max_length=32)
    title: str = Field(..., min_length=1, max_length=160)
    subtitle: str = Field(default="", max_length=160)
    order: int = 0


class Video(VideoCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"message": "ATMAN API — Music That Touches The Soul"}


@api_router.post("/bookings", response_model=BookingInquiry, status_code=201)
async def create_booking(payload: BookingInquiryCreate):
    inquiry = BookingInquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.booking_inquiries.insert_one(doc)
    return inquiry


@api_router.get("/settings", response_model=SiteSettings)
async def get_settings():
    doc = await db.site_settings.find_one({"_id": "singleton"}, {"_id": 0})
    if not doc:
        return SiteSettings()
    return SiteSettings(**doc)


@api_router.get("/videos", response_model=List[Video])
async def list_videos():
    items = await db.videos.find({}, {"_id": 0}).sort([("order", 1), ("created_at", 1)]).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            try:
                it['created_at'] = datetime.fromisoformat(it['created_at'])
            except Exception:
                pass
    return items


# ---------- Admin routes ----------
@api_router.post("/admin/login")
async def admin_login(payload: LoginPayload):
    email = payload.email.lower().strip()
    user = await db.admin_users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(email)
    return {"token": token, "email": email, "role": "admin"}


@api_router.get("/admin/me")
async def admin_me(current=Depends(require_admin)):
    return current


@api_router.get("/admin/bookings", response_model=List[BookingInquiry])
async def list_bookings(current=Depends(require_admin)):
    items = await db.booking_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for it in items:
        if isinstance(it.get('created_at'), str):
            try:
                it['created_at'] = datetime.fromisoformat(it['created_at'])
            except Exception:
                pass
    return items


@api_router.put("/admin/settings", response_model=SiteSettings)
async def update_settings(payload: SiteSettings, current=Depends(require_admin)):
    doc = payload.model_dump()
    await db.site_settings.update_one(
        {"_id": "singleton"}, {"$set": doc}, upsert=True
    )
    return payload


@api_router.post("/admin/videos", response_model=Video, status_code=201)
async def create_video(payload: VideoCreate, current=Depends(require_admin)):
    v = Video(**payload.model_dump())
    doc = v.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.videos.insert_one(doc)
    return v


@api_router.put("/admin/videos/{video_id}", response_model=Video)
async def update_video(video_id: str, payload: VideoCreate, current=Depends(require_admin)):
    existing = await db.videos.find_one({"id": video_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Video not found")
    updated = {**existing, **payload.model_dump()}
    await db.videos.update_one({"id": video_id}, {"$set": payload.model_dump()})
    if isinstance(updated.get('created_at'), str):
        try:
            updated['created_at'] = datetime.fromisoformat(updated['created_at'])
        except Exception:
            updated['created_at'] = datetime.now(timezone.utc)
    return Video(**updated)


@api_router.delete("/admin/videos/{video_id}")
async def delete_video(video_id: str, current=Depends(require_admin)):
    res = await db.videos.delete_one({"id": video_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Startup seeding ----------
DEFAULT_VIDEOS = [
    {"youtube_id": "5qap5aO4i9A", "title": "Sufi Evening · Live Set", "subtitle": "Palace Wedding · Udaipur", "order": 1},
    {"youtube_id": "jfKfPfyJRdk", "title": "Bollywood Anthems Medley", "subtitle": "Sangeet Night · Mumbai", "order": 2},
    {"youtube_id": "DWcJFNfaw9c", "title": "Rock Finale · Encore", "subtitle": "Corporate Gala · Bengaluru", "order": 3},
]


@app.on_event("startup")
async def on_startup():
    # Seed admin (idempotent). If env password changed, update the hash.
    existing = await db.admin_users.find_one({"email": ADMIN_EMAIL})
    if not existing:
        await db.admin_users.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin user: {ADMIN_EMAIL}")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.admin_users.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
        )
        logger.info(f"Updated admin password for: {ADMIN_EMAIL}")

    # Seed default videos ONCE if empty
    count = await db.videos.count_documents({})
    if count == 0:
        for v in DEFAULT_VIDEOS:
            video = Video(**v)
            doc = video.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.videos.insert_one(doc)
        logger.info("Seeded default videos.")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
