"use client";

import { motion } from "framer-motion";
import { Monitor, MapPin, Target, BarChart3 } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Monitor,
    text: "Écrans HD embarqués, visibles au niveau de la rue",
  },
  {
    icon: MapPin,
    text: "Aéroports, campus, quartiers d'affaires : au cœur des flux",
  },
  {
    icon: Target,
    text: "Ciblage par zone, parcours et créneaux horaires",
  },
  {
    icon: BarChart3,
    text: "Impressions et couverture mesurées pour chaque campagne",
  },
];

const DEMO_MAILTO =
  "mailto:thomas.raynal@hiverobotics.fr?subject=Publicit%C3%A9%20sur%20les%20robots%20Hive";

export function Advertising() {
  return (
    <section className="py-14 lg:py-24 bg-[#1B3D2C] text-white overflow-hidden">
      <div className="hive-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E85C] mb-6">
              Média mobile
            </p>
            <h2 className="hive-heading text-white max-w-xl">
              Vos robots deviennent{" "}
              <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">
                un média.
              </span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mt-6 max-w-lg">
              Chaque robot Hive circule des heures par jour dans des lieux à
              forte affluence. Équipé d&apos;écrans, il transforme chaque
              livraison en espace publicitaire premium, au plus près de votre
              audience.
            </p>

            <ul className="flex flex-col gap-4 mt-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#00E85C]" />
                    </div>
                    <span className="text-white/90">{feature.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={DEMO_MAILTO}
                className="inline-flex items-center justify-center gap-2 bg-[#00E85C] text-[#1B3D2C] px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                Devenir annonceur
              </a>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">Régie partenaire</span>
                <a
                  href="https://www.rainbooh.com/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rainbooh — régie publicitaire partenaire"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/images/logo_partners/rainbooh_logo.svg"
                    alt="Rainbooh"
                    width={120}
                    height={34}
                    className="h-7 w-auto"
                  />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full ring-1 ring-white/10"
          >
            <Image
              src="/images/robot_new_gen/hive-pizza-hut-la-defense.jpeg"
              alt="Robot Hive affichant une marque à La Défense"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B3D2C]/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
