"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Check, ChevronDown, Clock, X } from "lucide-react";

interface ReminderButtonProps {
  name: string;
  advantage: string;
  slug: string;
  code?: string;
}

export function ReminderButton({ name, advantage, slug, code }: ReminderButtonProps) {
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const url = `https://codes-de-parrainages.com/parrainage-${slug}`;
  const title = `Activer l'offre ${name} (${advantage})`;
  const description = `Lien pour ouvrir votre compte et débloquer la prime :\n${url}\n\n${
    code ? `Code parrainage à saisir : ${code}` : "Activation automatique via le lien partenaire certifié."
  }`;

  // Calculate reminder time: today at 20h00, or tomorrow at 20h00 if it's already past 19h30
  const getDates = () => {
    const now = new Date();
    const reminderDate = new Date();
    if (now.getHours() >= 20) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }
    reminderDate.setHours(20, 0, 0, 0);

    const endDate = new Date(reminderDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const formatISO = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d+/g, "");

    return {
      start: formatISO(reminderDate),
      end: formatISO(endDate),
    };
  };

  const handleGoogleCalendar = () => {
    const { start, end } = getDates();
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
      url
    )}`;
    window.open(gCalUrl, "_blank", "noopener,noreferrer");
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setOpen(false);
    }, 2000);
  };

  const handleIcsDownload = () => {
    const { start, end } = getDates();
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Codes de Parrainages//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${slug}-${Date.now()}@codes-de-parrainages.com`,
      `DTSTAMP:${start}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      `URL:${url}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT0M",
      "ACTION:DISPLAY",
      `DESCRIPTION:Rappel parrainage ${name}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `rappel-${slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Ajouter un rappel pour finaliser l'offre ce soir"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50/80 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
      >
        <Calendar size={13} className="text-blue-600 shrink-0" />
        <span>Me le rappeler ce soir</span>
        <ChevronDown size={11} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto w-72 rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-3 z-50 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Clock size={13} className="text-blue-600 shrink-0" />
              <span>Rappel prévu à 20h00 ce soir :</span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer"
              aria-label="Fermer"
            >
              <X size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleGoogleCalendar}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition-all text-left cursor-pointer active:scale-98"
            >
              <span className="text-base shrink-0">📅</span>
              <span className="flex-1">Google Agenda</span>
              {added && <Check size={14} className="text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={handleIcsDownload}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition-all text-left cursor-pointer active:scale-98"
            >
              <span className="text-base shrink-0">🍏</span>
              <span className="flex-1 truncate">Apple Calendrier / Outlook</span>
              {added && <Check size={14} className="text-emerald-600 shrink-0" />}
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center pt-2 mt-1 border-t border-slate-100">
            Crée une alerte avec le lien & le code pour finaliser tranquillement chez vous.
          </p>
        </div>
      )}
    </div>
  );
}
