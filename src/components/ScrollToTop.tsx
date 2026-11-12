"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className={`fixed bottom-5 right-5 z-40 p-2.5 sm:p-3 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-600 shadow-md hover:shadow-lg hover:text-blue-600 hover:border-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
    </button>
  );
}
