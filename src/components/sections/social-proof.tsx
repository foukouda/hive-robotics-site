"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import { DeploymentMap } from "@/components/maps/deployment-map";

interface KPI {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

const kpis: KPI[] = [
  { value: 7, prefix: "+", suffix: " ans", label: "de R&D" },
  { value: 15000, prefix: "", suffix: "+", label: "km parcourus" },
  { value: 5, prefix: "", suffix: "", label: "Clients signés" },
  { value: 40, prefix: "+", suffix: "", label: "robots en 2026" },
];

const clientLogos = [
  { name: "Center Parcs", src: "/images/logo_partners/Center parcs - full.png", height: 64 },
  { name: "Aéroport Nice", src: "/images/logo_partners/Aeroport_Nice_Cote_d'Azur_logo.svg.png", height: 72 },
  { name: "Belambra", src: "/images/logo_partners/belambra-logo.svg", height: 60 },
  { name: "Carrefour", src: "/images/logo_partners/carrefour_logo.png", height: 60 },
  { name: "Paris La Défense", src: "/images/logo_partners/paris_la_defense_logo.png", height: 72 },
  { name: "L'Oréal", src: "/images/logo_partners/loreal_logo.svg", height: 36 },
  { name: "Moove Lab", src: "/images/logo_partners/moove_lab_logo.jpeg", height: 60 },
  { name: "Station F", src: "/images/logo_partners/Logo_STATION_F.svg.png", height: 44 },
  { name: "Pôle Léonard de Vinci", src: "/images/logo_partners/pole_leonard_de_vinci_logo.png", height: 64 },
  { name: "CNAM", src: "/images/logo_partners/cnam_logo.gif", height: 44 },
  { name: "Village by CA Brie Picardie", src: "/images/logo_partners/village_by_ca_brie_picardie_logo.png", height: 64 },
  { name: "Via ID", src: "/images/logo_partners/via_id_logo.svg", height: 44 },
  { name: "Mobilians", src: "/images/logo_partners/mobilians_logo.png", height: 56 },
  { name: "NextMove", src: "/images/logo_partners/nextmove_logo.svg", height: 48 },
  { name: "Bpifrance", src: "/images/logo_partners/bpifrance_logo.svg", height: 36 },
  { name: "La French Tech", src: "/images/logo_partners/french_tech_logo.svg", height: 64 },
  { name: "Réseau Entreprendre 95", src: "/images/logo_partners/reseau_entreprendre_95_logo.svg", height: 60 },
];

export function SocialProof() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="hive-label">Traction</p>
          <h2 className="hive-heading text-[#0A0F1E]">
            Déjà déployés.
            <br />
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">Déjà rentables.</span>
          </h2>
        </motion.div>

        {/* 4 KPIs horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-4"
        >
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white p-6 lg:p-8">
              <p className="text-4xl font-semibold tracking-tight text-[#0A0F1E] md:text-5xl lg:text-6xl">
                <CountUp
                  end={kpi.value}
                  duration={2}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                />
              </p>
              <p className="hive-eyebrow mt-3">{kpi.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#718096] mb-6">
            Ils nous font confiance
          </p>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex w-max animate-marquee items-center gap-x-8 md:gap-x-12 lg:gap-x-14">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="relative flex-shrink-0 scale-75 md:scale-100 origin-center"
                  style={{ height: logo.height }}
                  aria-hidden={i >= clientLogos.length}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deployment map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#718096] mb-6">
            Nos déploiements
          </p>
          <DeploymentMap />
        </motion.div>
      </div>
    </section>
  );
}
