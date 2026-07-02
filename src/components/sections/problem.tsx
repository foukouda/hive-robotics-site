"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CountUp } from "@/components/count-up";

const stats = [
  {
    value: 53,
    suffix: "%",
    prefix: "",
    label: "du coût logistique total est concentré sur le dernier kilomètre.",
    source: "Statista 2023, Capgemini",
  },
  {
    value: 426000,
    suffix: "",
    prefix: "",
    label: "postes de chauffeurs non pourvus en Europe, projection 745 000 d'ici 2028.",
    source: "IRU Global Driver Shortage Report 2024",
  },
  {
    value: 63,
    suffix: "h",
    prefix: "",
    label: "de travail par semaine en moyenne pour les livreurs à vélo. 7 jours sur 7, par tous les temps.",
    source: "Étude Santé-courses / Médecins du Monde",
  },
  {
    value: 59,
    suffix: "%",
    prefix: "",
    label: "des livreurs ont déjà subi un accident, souvent après plus de 60 heures de travail hebdomadaires.",
    source: "Étude Santé-courses / Médecins du Monde",
  },
];

export function Problem() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="hive-label">Le problème</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Le modèle actuel{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">ne tient plus.</span>
          </h2>
        </motion.div>

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="hive-body max-w-3xl mb-20"
        >
          La livraison du dernier kilomètre est le maillon le plus coûteux, le plus polluant et le plus
          précaire de la chaîne logistique. Les livreurs travaillent dans des conditions intenables,
          les coûts explosent, et la demande ne fait qu&apos;augmenter.
        </motion.p>

        {/* Row 1: 2 stats left + photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-12">
            {stats.slice(0, 2).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="border-l-2 border-[#1B3D2C] pl-8"
              >
                <p className="font-mono text-5xl lg:text-6xl font-bold text-[#1B3D2C] mb-3">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-base text-[#0A0F1E] leading-relaxed mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#718096]">{stat.source}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-[#F7F9FC] border border-[#E8ECF4] h-[350px]"
          >
            <Image
              src="/images/livreurs/livraison_image_1.png"
              alt="Livreur à vélo en conditions difficiles"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </div>

        {/* Row 2: photo left + 2 stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl bg-[#F7F9FC] border border-[#E8ECF4] h-[350px] order-2 lg:order-1"
          >
            <Image
              src="/images/livreurs/livraison_image_2.jpg"
              alt="Conditions de travail des livreurs"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>

          <div className="space-y-12 order-1 lg:order-2">
            {stats.slice(2, 4).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="border-l-2 border-[#1B3D2C] pl-8"
              >
                <p className="font-mono text-5xl lg:text-6xl font-bold text-[#1B3D2C] mb-3">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-base text-[#0A0F1E] leading-relaxed mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#718096]">{stat.source}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-2xl font-medium text-[#0A0F1E] leading-snug">
            Les robots autonomes sont déjà déployés par milliers aux États-Unis.{" "}
            <span className="text-[#00E85C] font-bold">L&apos;Europe est prête à suivre.</span>
          </p>
          <p className="text-base text-[#4A5568] mt-4">
            60 000 tonnes de CO₂ par an, rien que pour la livraison de repas en France.
            Des milliers de livreurs travaillent dans des conditions précaires, sans protection sociale ni couverture en cas d&apos;accident.
            Le système ne protège ni les travailleurs, ni la planète. La technologie peut faire mieux.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
