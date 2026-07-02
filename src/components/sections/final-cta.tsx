"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Clock, Users, Undo2, Percent, Gift } from "lucide-react";
import { useReservationsCount } from "@/hooks/use-reservations-count";

function getDaysUntilLaunch(): number {
  const launch = new Date("2026-05-31T00:00:00");
  const now = new Date();
  const diff = launch.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function FinalCta() {
  const daysLeft = getDaysUntilLaunch();
  const reservationsCount = useReservationsCount();

  return (
    <section className="hive-section bg-gradient-to-br from-[#1B3D2C] to-[#0F2318] overflow-hidden relative">
      {/* Decorative background text */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] text-[280px] font-bold pointer-events-none select-none leading-none tracking-tight">
        HIVE
      </span>

      <div className="hive-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white mb-6">
              Sécurisez votre
              <br />
              <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8 text-[#00E85C]">accès anticipé.</span>
            </h2>

            <p className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed">
              Les premiers robots seront déployés en{" "}
              <span className="text-white font-semibold">novembre 2026</span>.
              {" "}Réservez maintenant pour investir avant tout le monde le jour du lancement.
            </p>

            {/* Early access advantages */}
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00E85C]/70 mb-4">
              Avantages accès anticipé
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: Clock, text: "Accès 24h avant le public le jour du lancement" },
                { icon: Percent, text: "5% de réduction exclusive sur chaque part" },
                { icon: Gift, text: "10 000 € de parts offertes (10 gagnants × 1 000 €)" },
                { icon: Undo2, text: "1 € remboursable à tout moment, sans engagement" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[#00E85C]" />
                  </div>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <button className="text-white/50 underline text-sm hover:text-white/80 transition-colors cursor-pointer">
              Être recontacté par l&apos;équipe
            </button>
          </motion.div>

          {/* Right - Reservation card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="bg-white/[0.07] backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-10"
          >
            {/* Countdown */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-5xl font-bold text-[#00E85C]">
                  {daysLeft}
                </span>
                <span className="text-white/60 text-sm">jours</span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <span className="text-white/60 text-sm">
                avant le lancement de la campagne
              </span>
            </div>

            {/* Live reservations counter */}
            <div className="bg-white/[0.05] rounded-2xl border border-white/10 p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-4 h-4 text-[#00E85C]" />
                <span className="text-xs text-white/50 uppercase tracking-wider font-mono">
                  Réservations en cours
                </span>
              </div>

              {reservationsCount === null ? (
                <>
                  <div className="h-12 w-32 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-white/[0.07] rounded mt-3 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-5xl font-bold text-white">
                      {reservationsCount.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-white/50 text-sm">
                      {reservationsCount > 1 ? "personnes ont réservé" : "personne a réservé"}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mt-3">
                    Rejoignez les premiers investisseurs Hive Robotics avant le lancement.
                  </p>
                </>
              )}
            </div>

            {/* CTA */}
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-2 whitespace-nowrap bg-white/10 text-white/50 px-4 sm:px-8 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg cursor-not-allowed mb-6"
            >
              Réservations fermées
            </button>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>Paiement Stripe</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Undo2 className="w-3.5 h-3.5" />
                <span>Sans engagement</span>
              </div>
            </div>

            <p className="text-[11px] text-white/30 text-center mt-4 leading-relaxed">
              Réservation sans engagement. Investissement à partir de 100&nbsp;&euro; à l&apos;ouverture de la campagne.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
