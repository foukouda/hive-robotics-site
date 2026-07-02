"use client";

import { motion } from "framer-motion";
import { Clock, Percent, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
}

const advantages: Advantage[] = [
  {
    icon: Clock,
    title: "Accès 24h avant tout le monde",
    description:
      "Accédez à la plateforme d'investissement 24 heures avant l'ouverture publique. Choisissez vos robots en priorité.",
  },
  {
    icon: Percent,
    title: "Réduction de 5% sur vos parts",
    description:
      "Bénéficiez d'une réduction exclusive de 5% sur le prix de chaque part achetée lors du lancement.",
  },
  {
    icon: Gift,
    title: "10 000 € de parts offertes",
    description:
      "Tirage au sort automatique parmi les inscrits à la pré-réservation : 10 gagnants remportent chacun 10 parts de robot (1 000 € par gagnant), soit 100 parts mises en jeu au total, l'équivalent d'un robot presque intégralement offert. Aucune action supplémentaire requise.",
  },
];

export function EarlyAccess() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="hive-label">Accès anticipé</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Réservez maintenant.
            <br />
            Profitez{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">
              en premier.
            </span>
          </h2>
          <p className="text-lg text-[#4A5568] mt-6 max-w-2xl">
            En réservant votre place dès aujourd&apos;hui pour 1 €, vous
            débloquez des avantages exclusifs.
          </p>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="bg-[#F7F9FC] rounded-2xl border border-[#E8ECF4] p-8 text-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-[#E8F5EC] flex items-center justify-center mx-auto mb-6">
                <advantage.icon
                  className="w-6 h-6 text-[#1B3D2C]"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-xl text-[#0A0F1E] mb-3">
                {advantage.title}
              </h3>

              {/* Description */}
              <p className="text-[#4A5568]">{advantage.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="text-center"
        >
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center bg-[#E8ECF4] text-[#94A3B8] rounded-full px-10 py-4 font-semibold cursor-not-allowed"
          >
            Réservations fermées
          </button>
          <p className="text-xs text-[#718096] mt-4">
            Sans engagement. Remboursable à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
