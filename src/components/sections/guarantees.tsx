"use client";

import { motion } from "framer-motion";
import { Wrench, RefreshCw, TrendingUp, HandCoins, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Guarantee {
  icon: LucideIcon;
  title: string;
  description: string;
}

const guarantees: Guarantee[] = [
  {
    icon: Wrench,
    title: "Réparation sous 7 jours",
    description:
      "Notre équipe technique intervient rapidement. Si la réparation prend plus de 7 jours, un robot de remplacement est mis en service.",
  },
  {
    icon: RefreshCw,
    title: "Robot de remplacement",
    description:
      "Continuité de service garantie. Votre investissement continue de générer des revenus même pendant une maintenance.",
  },
  {
    icon: TrendingUp,
    title: "Rendement plancher",
    description:
      "Un rendement minimum est garanti pendant toute la durée de location active de votre robot.",
  },
  {
    icon: HandCoins,
    title: "Rachat à 80% à 5 ans",
    description:
      "Hive Robotics s'engage à racheter vos parts à 80% de leur valeur initiale après 5 ans.",
  },
  {
    icon: BarChart3,
    title: "Dashboard temps réel",
    description:
      "Suivez les revenus, l'état et la localisation de votre robot en temps réel depuis votre espace investisseur.",
  },
];

export function Guarantees() {
  const firstRow = guarantees.slice(0, 3);
  const secondRow = guarantees.slice(3);

  return (
    <section className="hive-section bg-[#F7F9FC]">
      <div className="hive-container">
        {/* Header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="hive-label">Garanties</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Votre investissement,
            <br />
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">protégé.</span>
          </h2>
        </motion.div>

        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {firstRow.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8ECF4] p-8 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5EC] flex items-center justify-center mb-6">
                <guarantee.icon className="w-6 h-6 text-[#1B3D2C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg text-[#0A0F1E] mb-2">
                {guarantee.title}
              </h3>
              <p className="text-[#4A5568] text-sm leading-relaxed">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Second row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl md:max-w-none md:flex md:justify-center">
          {secondRow.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (index + 3) * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8ECF4] p-8 shadow-sm md:w-[calc(33.333%-8px)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5EC] flex items-center justify-center mb-6">
                <guarantee.icon className="w-6 h-6 text-[#1B3D2C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg text-[#0A0F1E] mb-2">
                {guarantee.title}
              </h3>
              <p className="text-[#4A5568] text-sm leading-relaxed">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
