import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Loader2, Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { api, formatApiError } from "@/lib/api";
import { useSiteSettings } from "@/hooks/useSiteData";

const EVENT_TYPES = [
  "Luxury Wedding",
  "Destination Wedding",
  "Corporate Event",
  "Private Celebration",
  "Sufi / Spiritual Evening",
  "Other",
];

const initial = {
  name: "",
  email: "",
  phone: "",
  event_type: "",
  event_date: undefined,
  guest_count: "",
  location: "",
  message: "",
};

export const Booking = () => {
  const settings = useSiteSettings();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.event_type) {
      toast.error("Please fill your name, email, phone and event type.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        event_date: form.event_date ? format(form.event_date, "yyyy-MM-dd") : null,
      };
      await api.post("/bookings", payload);
      toast.success("Inquiry received. Our team will reach out shortly.");
      setForm(initial);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-[#C9A227]/25 focus:border-[#C9A227] outline-none py-3 text-[#F8F6F2] placeholder:text-[#F8F6F2]/40 text-sm tracking-wide transition-colors";

  return (
    <section
      id="booking"
      data-testid="booking-section"
      className="relative bg-[#121212] py-24 lg:py-32 border-t border-[#C9A227]/10"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <span className="ornament">Book ATMAN</span>
            <h2 className="mt-6 font-cinzel text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F8F6F2]">
              Let&apos;s craft your <span className="italic font-cormorant gold-text">unforgettable</span> evening.
            </h2>
            <p className="mt-6 text-[#F8F6F2]/65 text-sm lg:text-base leading-relaxed">
              Share a few details about your event. Our artistic director will
              personally reach out within 24 hours to design a set curated
              around your story.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              <div className="flex gap-4 items-start">
                <div className="text-[#C9A227] text-xs tracking-[0.3em] uppercase w-24">Reach us</div>
                <div className="text-[#F8F6F2]/75 break-all">{settings.email}</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C9A227] text-xs tracking-[0.3em] uppercase w-24">Call</div>
                <div className="text-[#F8F6F2]/75">{settings.phone}</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C9A227] text-xs tracking-[0.3em] uppercase w-24">Based in</div>
                <div className="text-[#F8F6F2]/75">{settings.location}</div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-7 bg-[#1a1a1a] border border-[#C9A227]/15 p-8 lg:p-12"
            data-testid="booking-form"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  className={inputCls}
                  data-testid="booking-name"
                />
              </div>
              <div>
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                  data-testid="booking-email"
                />
              </div>
              <div>
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputCls}
                  data-testid="booking-phone"
                />
              </div>
              <div>
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Event Type</label>
                <Select
                  value={form.event_type}
                  onValueChange={(v) => update("event_type", v)}
                >
                  <SelectTrigger
                    data-testid="booking-event-type"
                    className="w-full mt-1 bg-transparent border-0 border-b border-[#C9A227]/25 rounded-none focus:border-[#C9A227] focus:ring-0 text-[#F8F6F2] px-0 h-11 text-sm"
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#C9A227]/25 text-[#F8F6F2]">
                    {EVENT_TYPES.map((t) => (
                      <SelectItem key={t} value={t} className="focus:bg-[#C9A227]/15 focus:text-[#F8F6F2]">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Event Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      data-testid="booking-date-btn"
                      className={`${inputCls} flex items-center justify-between text-left`}
                    >
                      <span className={form.event_date ? "text-[#F8F6F2]" : "text-[#F8F6F2]/40"}>
                        {form.event_date ? format(form.event_date, "PPP") : "Pick a date"}
                      </span>
                      <CalendarIcon size={16} className="text-[#C9A227]" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1a1a1a] border border-[#C9A227]/25 text-[#F8F6F2]" align="start">
                    <Calendar mode="single" selected={form.event_date} onSelect={(d) => update("event_date", d)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Guest Count</label>
                <input
                  value={form.guest_count}
                  onChange={(e) => update("guest_count", e.target.value)}
                  placeholder="e.g. 200"
                  className={inputCls}
                  data-testid="booking-guests"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Venue / Location</label>
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City, venue or destination"
                  className={inputCls}
                  data-testid="booking-location"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Your Vision</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your event, preferred genres, mood…"
                  rows={4}
                  className={`${inputCls} resize-none`}
                  data-testid="booking-message"
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={submitting}
                data-testid="booking-submit"
                className="gold-btn inline-flex items-center gap-3 bg-[#C9A227] disabled:opacity-70 text-[#121212] font-cinzel tracking-[0.28em] uppercase text-xs px-8 py-4 rounded-none"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Inquiry
                  </>
                )}
              </button>
              <p className="mt-4 text-[0.7rem] text-[#F8F6F2]/45">
                By submitting, you agree to be contacted by the ATMAN team regarding your inquiry.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
