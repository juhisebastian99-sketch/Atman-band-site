import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/lib/api";

const DEFAULT_SETTINGS = {
  email: "hello@atmanmusic.co",
  phone: "+91 · placeholder",
  location: "Mumbai · India · Available worldwide",
  instagram: "",
  youtube: "",
  spotify: "",
  facebook: "",
  whatsapp: "",
  hero_tagline: "Music That Touches The Soul",
  hero_subline:
    "Luxury Live Music for Weddings, Destination Weddings, Corporate Events & Private Celebrations.",
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/settings`)
      .then((r) => {
        if (!alive) return;
        const d = r?.data;
        if (d && typeof d === "object" && !Array.isArray(d)) {
          setSettings({ ...DEFAULT_SETTINGS, ...d });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return settings;
};

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/videos`)
      .then((r) => {
        if (!alive) return;
        if (Array.isArray(r?.data)) setVideos(r.data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return videos;
};

export const useShows = () => {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/shows`)
      .then((r) => {
        if (!alive) return;
        if (Array.isArray(r?.data)) setShows(r.data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return shows;
};
