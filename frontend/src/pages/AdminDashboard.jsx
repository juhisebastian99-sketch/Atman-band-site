import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  LogOut, Save, Trash2, Plus, Youtube, Contact, Mail, MessageSquare,
  Loader2, Inbox, Calendar as CalendarIcon,
} from "lucide-react";
import { api, clearToken, getToken, formatApiError } from "@/lib/api";
import AtmanLogo from "@/components/AtmanLogo";

const DEFAULT_SETTINGS = {
  email: "", phone: "", location: "",
  instagram: "", youtube: "", spotify: "", whatsapp: "",
  hero_tagline: "", hero_subline: "",
};

const emptyVideo = { youtube_id: "", title: "", subtitle: "", order: 0 };
const emptyShow = { day: "", month: "", title: "", city: "", ticket_url: "", order: 0 };
const inputCls =
  "w-full bg-transparent border-b border-[#C9A227]/25 focus:border-[#C9A227] outline-none py-2.5 text-[#F8F6F2] placeholder:text-[#F8F6F2]/40 text-sm";

const Field = ({ label, ...props }) => (
  <div>
    <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">{label}</label>
    <input className={inputCls} {...props} />
  </div>
);

export default function AdminDashboard() {
  const nav = useNavigate();
  const [tab, setTab] = useState("settings");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [videos, setVideos] = useState([]);
  const [shows, setShows] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [newVid, setNewVid] = useState(emptyVideo);
  const [newShow, setNewShow] = useState(emptyShow);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      nav("/admin", { replace: true });
      return;
    }
    Promise.all([
      api.get("/settings").then((r) => setSettings({ ...DEFAULT_SETTINGS, ...r.data })),
      api.get("/videos").then((r) => setVideos(r.data || [])),
      api.get("/shows").then((r) => setShows(r.data || [])).catch(() => {}),
      api.get("/admin/bookings").then((r) => setInquiries(r.data || [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, [nav]);

  const logout = () => {
    clearToken();
    toast.success("Signed out.");
    nav("/admin", { replace: true });
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { data } = await api.put("/admin/settings", settings);
      setSettings({ ...DEFAULT_SETTINGS, ...data });
      toast.success("Contact details saved.");
    } catch (e) {
      toast.error(formatApiError(e));
    } finally {
      setSaving(false);
    }
  };

  const addVideo = async () => {
    if (!newVid.youtube_id || !newVid.title) return toast.error("YouTube ID and title are required.");
    try {
      const { data } = await api.post("/admin/videos", { ...newVid, order: Number(newVid.order) || 0 });
      setVideos((v) => [...v, data].sort((a, b) => a.order - b.order));
      setNewVid(emptyVideo);
      toast.success("Video added.");
    } catch (e) {
      toast.error(formatApiError(e));
    }
  };

  const updateVideo = async (id, patch) => {
    const current = videos.find((v) => v.id === id);
    if (!current) return;
    const next = { ...current, ...patch };
    setVideos((vs) => vs.map((v) => (v.id === id ? next : v)));
    try {
      await api.put(`/admin/videos/${id}`, {
        youtube_id: next.youtube_id,
        title: next.title,
        subtitle: next.subtitle || "",
        order: Number(next.order) || 0,
      });
    } catch (e) {
      toast.error(formatApiError(e));
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await api.delete(`/admin/videos/${id}`);
      setVideos((v) => v.filter((x) => x.id !== id));
      toast.success("Video deleted.");
    } catch (e) {
      toast.error(formatApiError(e));
    }
  };

  const addShow = async () => {
    if (!newShow.day || !newShow.month || !newShow.title)
      return toast.error("Day, month and title are required.");
    try {
      const { data } = await api.post("/admin/shows", {
        ...newShow,
        order: Number(newShow.order) || 0,
      });
      setShows((s) => [...s, data].sort((a, b) => (a.order || 0) - (b.order || 0)));
      setNewShow(emptyShow);
      toast.success("Show added.");
    } catch (e) {
      toast.error(formatApiError(e));
    }
  };

  const updateShow = async (id, patch) => {
    const current = shows.find((v) => v.id === id);
    if (!current) return;
    const next = { ...current, ...patch };
    setShows((vs) => vs.map((v) => (v.id === id ? next : v)));
    try {
      await api.put(`/admin/shows/${id}`, {
        day: next.day,
        month: next.month,
        title: next.title,
        city: next.city || "",
        ticket_url: next.ticket_url || "",
        order: Number(next.order) || 0,
      });
    } catch (e) {
      toast.error(formatApiError(e));
    }
  };

  const deleteShow = async (id) => {
    if (!window.confirm("Delete this show?")) return;
    try {
      await api.delete(`/admin/shows/${id}`);
      setShows((v) => v.filter((x) => x.id !== id));
      toast.success("Show deleted.");
    } catch (e) {
      toast.error(formatApiError(e));
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F8F6F2] font-poppins">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#121212]/85 border-b border-[#C9A227]/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AtmanLogo size={36} />
            <span className="hidden md:inline text-[0.65rem] tracking-[0.35em] uppercase text-[#C9A227]/80">
              Studio · Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => nav("/")} data-testid="admin-goto-site"
              className="text-[0.7rem] tracking-[0.28em] uppercase text-[#F8F6F2]/70 hover:text-[#C9A227] transition-colors">
              View site
            </button>
            <button onClick={logout} data-testid="admin-logout"
              className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.28em] uppercase text-[#F8F6F2]/80 border border-[#C9A227]/40 hover:border-[#C9A227] px-4 py-2.5">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="ornament">Control Studio</span>
            <h1 className="mt-4 font-cinzel text-3xl lg:text-4xl">
              Manage your <span className="italic font-cormorant gold-text">ATMAN</span> presence
            </h1>
          </div>
          <div className="flex gap-2" data-testid="admin-tabs">
            {[
              { k: "settings", label: "Contact", icon: Contact },
              { k: "videos", label: "Videos", icon: Youtube },
              { k: "shows", label: "Shows", icon: CalendarIcon },
              { k: "inquiries", label: "Inquiries", icon: Inbox },
            ].map((t) => {
              const Icon = t.icon;
              const active = tab === t.k;
              return (
                <button key={t.k} onClick={() => setTab(t.k)} data-testid={`admin-tab-${t.k}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 border text-[0.7rem] tracking-[0.28em] uppercase transition-colors ${
                    active ? "bg-[#C9A227] text-[#121212] border-[#C9A227]"
                           : "border-[#C9A227]/30 text-[#F8F6F2]/75 hover:border-[#C9A227]"
                  }`}>
                  <Icon size={14} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="py-24 flex items-center justify-center text-[#C9A227]">
              <Loader2 className="animate-spin" />
            </div>
          ) : tab === "settings" ? (
            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="bg-[#1a1a1a] border border-[#C9A227]/15 p-8 lg:p-10" data-testid="admin-settings-panel">
              <div className="flex items-center gap-3 mb-8">
                <Mail size={18} className="text-[#C9A227]" />
                <h2 className="font-cinzel text-xl">Contact &amp; Social</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Public Email" data-testid="settings-email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} placeholder="hello@atmanmusic.co" />
                <Field label="Phone" data-testid="settings-phone" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} placeholder="+91 90000 00000" />
                <Field label="WhatsApp URL" data-testid="settings-whatsapp" value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="https://wa.me/919000000000" />
                <Field label="Location" data-testid="settings-location" value={settings.location} onChange={(e) => setSettings({ ...settings, location: e.target.value })} placeholder="Mumbai · Available worldwide" />
                <Field label="Instagram URL" data-testid="settings-instagram" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} placeholder="https://instagram.com/…" />
                <Field label="YouTube URL" data-testid="settings-youtube" value={settings.youtube} onChange={(e) => setSettings({ ...settings, youtube: e.target.value })} placeholder="https://youtube.com/@…" />
                <Field label="Spotify URL" data-testid="settings-spotify" value={settings.spotify} onChange={(e) => setSettings({ ...settings, spotify: e.target.value })} placeholder="https://open.spotify.com/artist/…" />
              </div>
              <div className="mt-10 pt-6 border-t border-[#C9A227]/15">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare size={18} className="text-[#C9A227]" />
                  <h2 className="font-cinzel text-xl">Hero Copy</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Hero Tagline" data-testid="settings-hero-tagline" value={settings.hero_tagline} onChange={(e) => setSettings({ ...settings, hero_tagline: e.target.value })} placeholder="Music That Touches The Soul" />
                  <Field label="Hero Subline" data-testid="settings-hero-subline" value={settings.hero_subline} onChange={(e) => setSettings({ ...settings, hero_subline: e.target.value })} placeholder="Luxury Live Music for…" />
                </div>
              </div>
              <button onClick={saveSettings} disabled={saving} data-testid="settings-save"
                className="gold-btn mt-10 inline-flex items-center gap-3 bg-[#C9A227] disabled:opacity-70 text-[#121212] font-cinzel tracking-[0.28em] uppercase text-xs px-8 py-4">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Changes
              </button>
            </motion.div>
          ) : tab === "videos" ? (
            <motion.div key="videos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} data-testid="admin-videos-panel">
              <div className="bg-[#1a1a1a] border border-[#C9A227]/15 p-8 lg:p-10 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Plus size={18} className="text-[#C9A227]" />
                  <h2 className="font-cinzel text-xl">Add Video</h2>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  <Field label="YouTube ID" data-testid="new-video-id" value={newVid.youtube_id} onChange={(e) => setNewVid({ ...newVid, youtube_id: e.target.value })} placeholder="dQw4w9WgXcQ" />
                  <Field label="Title" data-testid="new-video-title" value={newVid.title} onChange={(e) => setNewVid({ ...newVid, title: e.target.value })} placeholder="Sufi Evening · Live Set" />
                  <Field label="Subtitle" data-testid="new-video-subtitle" value={newVid.subtitle} onChange={(e) => setNewVid({ ...newVid, subtitle: e.target.value })} placeholder="Palace Wedding · Udaipur" />
                  <Field label="Order" data-testid="new-video-order" type="number" value={newVid.order} onChange={(e) => setNewVid({ ...newVid, order: e.target.value })} placeholder="0" />
                </div>
                <button onClick={addVideo} data-testid="new-video-add"
                  className="gold-btn mt-8 inline-flex items-center gap-3 bg-[#C9A227] text-[#121212] font-cinzel tracking-[0.28em] uppercase text-xs px-8 py-4">
                  <Plus size={16} /> Add Video
                </button>
                <p className="mt-3 text-[0.7rem] text-[#F8F6F2]/45">
                  YouTube ID is the code after <code className="text-[#C9A227]/90">v=</code> in the video URL.
                </p>
              </div>

              <div className="space-y-4" data-testid="admin-video-list">
                {videos.length === 0 && (
                  <div className="text-center text-[#F8F6F2]/50 py-16 border border-dashed border-[#C9A227]/20">
                    No videos yet — add your first performance above.
                  </div>
                )}
                {videos.map((v) => (
                  <div key={v.id} data-testid={`video-row-${v.id}`}
                    className="bg-[#1a1a1a] border border-[#C9A227]/15 p-6 grid lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-3">
                      <div className="aspect-video bg-black border border-[#C9A227]/20 overflow-hidden">
                        <img src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`} alt={v.title}
                          className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <Field label="YouTube ID" value={v.youtube_id} onChange={(e) => updateVideo(v.id, { youtube_id: e.target.value })} />
                    </div>
                    <div className="lg:col-span-3">
                      <Field label="Title" value={v.title} onChange={(e) => updateVideo(v.id, { title: e.target.value })} />
                    </div>
                    <div className="lg:col-span-2">
                      <Field label="Subtitle" value={v.subtitle || ""} onChange={(e) => updateVideo(v.id, { subtitle: e.target.value })} />
                    </div>
                    <div className="lg:col-span-1">
                      <Field label="Order" type="number" value={v.order} onChange={(e) => updateVideo(v.id, { order: e.target.value })} />
                    </div>
                    <div className="lg:col-span-1 flex lg:justify-end">
                      <button onClick={() => deleteVideo(v.id)} data-testid={`delete-video-${v.id}`}
                        className="p-3 text-[#F8F6F2]/70 hover:text-red-400 border border-[#C9A227]/20 hover:border-red-400/50 transition-colors"
                        aria-label="Delete video">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : tab === "shows" ? (
            <motion.div key="shows" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} data-testid="admin-shows-panel">
              <div className="bg-[#1a1a1a] border border-[#C9A227]/15 p-8 lg:p-10 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Plus size={18} className="text-[#C9A227]" />
                  <h2 className="font-cinzel text-xl">Add Upcoming Show</h2>
                </div>
                <div className="grid md:grid-cols-6 gap-6">
                  <Field label="Day" data-testid="new-show-day" value={newShow.day} onChange={(e) => setNewShow({ ...newShow, day: e.target.value })} placeholder="24" />
                  <Field label="Month" data-testid="new-show-month" value={newShow.month} onChange={(e) => setNewShow({ ...newShow, month: e.target.value })} placeholder="Jun" />
                  <Field label="Title" data-testid="new-show-title" value={newShow.title} onChange={(e) => setNewShow({ ...newShow, title: e.target.value })} placeholder="Live at Blue Frog" />
                  <Field label="City" data-testid="new-show-city" value={newShow.city} onChange={(e) => setNewShow({ ...newShow, city: e.target.value })} placeholder="Mumbai, India" />
                  <Field label="Ticket URL" data-testid="new-show-ticket" value={newShow.ticket_url} onChange={(e) => setNewShow({ ...newShow, ticket_url: e.target.value })} placeholder="https://bookmyshow.com/…" />
                  <Field label="Order" data-testid="new-show-order" type="number" value={newShow.order} onChange={(e) => setNewShow({ ...newShow, order: e.target.value })} placeholder="0" />
                </div>
                <button onClick={addShow} data-testid="new-show-add"
                  className="gold-btn mt-8 inline-flex items-center gap-3 bg-[#C9A227] text-[#121212] font-cinzel tracking-[0.28em] uppercase text-xs px-8 py-4">
                  <Plus size={16} /> Add Show
                </button>
              </div>

              <div className="space-y-4" data-testid="admin-show-list">
                {shows.length === 0 && (
                  <div className="text-center text-[#F8F6F2]/50 py-16 border border-dashed border-[#C9A227]/20">
                    No shows yet — add your first upcoming event above.
                  </div>
                )}
                {shows.map((s) => (
                  <div key={s.id} data-testid={`show-row-${s.id}`}
                    className="bg-[#1a1a1a] border border-[#C9A227]/15 p-6 grid lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-1">
                      <Field label="Day" value={s.day} onChange={(e) => updateShow(s.id, { day: e.target.value })} />
                    </div>
                    <div className="lg:col-span-1">
                      <Field label="Month" value={s.month} onChange={(e) => updateShow(s.id, { month: e.target.value })} />
                    </div>
                    <div className="lg:col-span-3">
                      <Field label="Title" value={s.title} onChange={(e) => updateShow(s.id, { title: e.target.value })} />
                    </div>
                    <div className="lg:col-span-3">
                      <Field label="City" value={s.city || ""} onChange={(e) => updateShow(s.id, { city: e.target.value })} />
                    </div>
                    <div className="lg:col-span-2">
                      <Field label="Ticket URL" value={s.ticket_url || ""} onChange={(e) => updateShow(s.id, { ticket_url: e.target.value })} />
                    </div>
                    <div className="lg:col-span-1">
                      <Field label="Order" type="number" value={s.order} onChange={(e) => updateShow(s.id, { order: e.target.value })} />
                    </div>
                    <div className="lg:col-span-1 flex lg:justify-end">
                      <button onClick={() => deleteShow(s.id)} data-testid={`delete-show-${s.id}`}
                        className="p-3 text-[#F8F6F2]/70 hover:text-red-400 border border-[#C9A227]/20 hover:border-red-400/50 transition-colors"
                        aria-label="Delete show">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="inquiries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="bg-[#1a1a1a] border border-[#C9A227]/15 p-8 lg:p-10" data-testid="admin-inquiries-panel">
              <div className="flex items-center gap-3 mb-6">
                <Inbox size={18} className="text-[#C9A227]" />
                <h2 className="font-cinzel text-xl">Booking Inquiries</h2>
                <span className="ml-2 text-[0.65rem] tracking-[0.3em] uppercase text-[#F8F6F2]/50">
                  {inquiries.length} total
                </span>
              </div>
              {inquiries.length === 0 ? (
                <div className="text-center text-[#F8F6F2]/50 py-16 border border-dashed border-[#C9A227]/20">
                  No inquiries yet. When a client submits the booking form, they will appear here.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((i) => (
                    <div key={i.id} data-testid={`inquiry-${i.id}`}
                      className="border border-[#C9A227]/15 p-5 grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]/80">Name</div>
                        <div className="mt-1 text-[#F8F6F2]">{i.name}</div>
                        <div className="mt-3 text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]/80">Event</div>
                        <div className="mt-1 text-[#F8F6F2]">{i.event_type}</div>
                      </div>
                      <div>
                        <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]/80">Contact</div>
                        <div className="mt-1 text-[#F8F6F2] break-all">{i.email}</div>
                        <div className="text-[#F8F6F2]/70">{i.phone}</div>
                        <div className="mt-3 text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]/80">Date · Guests</div>
                        <div className="mt-1 text-[#F8F6F2]/85">{i.event_date || "—"} · {i.guest_count || "—"}</div>
                      </div>
                      <div>
                        <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]/80">Location</div>
                        <div className="mt-1 text-[#F8F6F2]/85">{i.location || "—"}</div>
                        <div className="mt-3 text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A227]/80">Message</div>
                        <div className="mt-1 text-[#F8F6F2]/75 whitespace-pre-line">{i.message || "—"}</div>
                        <div className="mt-3 text-[0.6rem] text-[#F8F6F2]/40">
                          {i.created_at ? new Date(i.created_at).toLocaleString() : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
