"use client";

import { motion } from "framer-motion";

const partnerLogos = [
  { name: "Center Parcs", src: "/images/logo_partners/Center parcs - full.png", height: 56 },
  { name: "Aéroport Nice", src: "/images/logo_partners/Aeroport_Nice_Cote_d'Azur_logo.svg.png", height: 64 },
  { name: "Belambra", src: "/images/logo_partners/belambra-logo.svg", height: 52 },
  { name: "Carrefour", src: "/images/logo_partners/carrefour_logo.png", height: 52 },
  { name: "Paris La Défense", src: "/images/logo_partners/paris_la_defense_logo.png", height: 64 },
  { name: "L'Oréal", src: "/images/logo_partners/loreal_logo.svg", height: 32 },
  { name: "Moove Lab", src: "/images/logo_partners/moove_lab_logo.jpeg", height: 52 },
  { name: "Station F", src: "/images/logo_partners/Logo_STATION_F.svg.png", height: 40 },
  { name: "Pôle Léonard de Vinci", src: "/images/logo_partners/pole_leonard_de_vinci_logo.png", height: 56 },
  { name: "CNAM", src: "/images/logo_partners/cnam_logo.gif", height: 40 },
  { name: "Village by CA Brie Picardie", src: "/images/logo_partners/village_by_ca_brie_picardie_logo.png", height: 56 },
  { name: "Via ID", src: "/images/logo_partners/via_id_logo.svg", height: 40 },
  { name: "Mobilians", src: "/images/logo_partners/mobilians_logo.png", height: 48 },
  { name: "NextMove", src: "/images/logo_partners/nextmove_logo.svg", height: 44 },
  { name: "Bpifrance", src: "/images/logo_partners/bpifrance_logo.svg", height: 32 },
  { name: "La French Tech", src: "/images/logo_partners/french_tech_logo.svg", height: 56 },
  { name: "Réseau Entreprendre 95", src: "/images/logo_partners/reseau_entreprendre_95_logo.svg", height: 52 },
];

export function TrustBar() {
  const loop = [...partnerLogos, ...partnerLogos];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-[#F7F9FC] py-8 border-y border-[#E8ECF4] overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="text-xs font-mono uppercase tracking-[0.2em] text-[#718096] text-center mb-6"
      >
        Ils nous font confiance
      </motion.p>

      <div className="relative w-full overflow-hidden">
        {/* Fades latéraux */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F9FC] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F9FC] to-transparent z-10" />

        <div className="flex w-max animate-marquee items-center gap-x-8 md:gap-x-12 lg:gap-x-16">
          {loop.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="relative flex-shrink-0"
              style={{ height: logo.height }}
              aria-hidden={i >= partnerLogos.length}
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
    </motion.section>
  );
}
