"use client";

import { useState } from "react";
import { Calendar, Check, ChevronDown, Clock } from "lucide-react";

interface ReminderButtonProps {
  name: string;
  advantage: string;
  slug: string;
  code?: string;
}

export function ReminderButton({ name, advantage, slug, code }: ReminderButtonProps) {
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);

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
    }, 2500);
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
    }, 2500);
  };

  return (
    <div className="relative inline-block text-left">
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
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-64 rounded-xl bg-white border border-slate-200/90 shadow-xl p-2.5 z-30 animate-fadeIn">
          <p className="text-[11px] font-bold text-slate-700 px-2 py-1 mb-1 border-b border-slate-100 flex items-center gap-1">
            <Clock size={12} className="text-blue-600" />
            <span>Rappel prévu à 20h00 :</span>
          </p>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleGoogleCalendar}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left cursor-pointer"
            >
              <span>📅</span>
              <span className="flex-1">Google Agenda</span>
              {added && <Check size={13} className="text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={handleIcsDownload}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left cursor-pointer"
            >
              <span>🍏</span>
              <span className="flex-1">Apple Calendrier / Outlook (.ics)</span>
              {added && <Check size={13} className="text-emerald-600" />}
            </button>
          </div>

          <p className="text-[10px] text-slate-400 px-2 pt-1.5 border-t border-slate-100 mt-1">
            Crée une alerte avec le lien & le code pour finaliser tranquillement chez vous.
          </p>
        </div>
      )}
    </div>
  );
}
