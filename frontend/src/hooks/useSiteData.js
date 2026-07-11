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
      .then((r) => alive && setSettings({ ...DEFAULT_SETTINGS, ...r.data }))
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
      .then((r) => alive && setVideos(r.data || []))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return videos;
};
