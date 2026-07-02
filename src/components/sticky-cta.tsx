"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

function getDaysUntilLaunch(): number {
  const launch = new Date("2026-05-31T00:00:00");
  const now = new Date();
  const diff = launch.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    setDaysLeft(getDaysUntilLaunch());

    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const footerThreshold = docHeight - 400;

      setIsVisible(scrolled > 600 && scrolled < footerThreshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-4 md:bottom-6 md:left-auto md:right-6 md:w-auto z-50"
        >
          <div className="flex items-center gap-3 md:gap-5 bg-[#1B3D2C] text-white rounded-full pl-5 pr-5 py-3 shadow-2xl shadow-[#1B3D2C]/30">
            {daysLeft !== null && (
              <div className="hidden md:flex items-center gap-2 text-[#00E85C]">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-sm font-bold">
                  J-{daysLeft}
                </span>
              </div>
            )}
            <div className="hidden md:block h-6 w-px bg-white/20" />
            <span className="font-semibold text-base md:text-lg flex-1 md:flex-initial text-white/70">
              Réservations fermées
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
