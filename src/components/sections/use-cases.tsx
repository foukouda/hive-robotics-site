"use client";

import { motion } from "framer-motion";
import { Plane, Factory, Building2, Hotel, TreePalm, Truck } from "lucide-react";
import Image from "next/image";

const useCases = [
  {
    icon: Plane,
    title: "Aéroports",
    description: "Livraison aux portes d'embarquement et entre terminaux",
    image: "/images/robot_new_gen/aeroport_nice.jpeg",
  },
  {
    icon: Factory,
    title: "Usine",
    description: "Transport inter-ateliers et acheminement de pièces en zone industrielle",
    image: "/images/robot_new_gen/usine.jpeg",
  },
  {
    icon: Building2,
    title: "Quartiers d'affaires",
    description: "Livraison de repas et colis en zones piétonnes",
    image: "/images/robot_new_gen/hive-pizza-hut-la-defense.jpeg",
  },
  {
    icon: TreePalm,
    title: "Résidences de vacances",
    description: "Service de livraison aux hébergements",
    image: "/images/robot_new_gen/Center_parcs.jpeg",
  },
  {
    icon: Hotel,
    title: "Campus & hôtels",
    description: "Transport autonome entre bâtiments",
    image: "/images/robot_new_gen/Campus.jpeg",
  },
  {
    icon: Truck,
    title: "Logistique urbaine",
    description: "Livraison dernier kilomètre en zone dense",
    image: "/images/robot_new_gen/carrefour.jpeg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function UseCases() {
  return (
    <section className="py-14 lg:py-24 bg-[#F7F9FC]">
      <div className="hive-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hive-label"
        >
          Cas d&apos;usage
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hive-heading text-[#0A0F1E]"
        >
          Conçus pour des
            <br />
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">environnements variés.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#4A5568] text-lg mb-16 max-w-2xl"
        >
          Nos robots naviguent en intérieur comme en extérieur, s&apos;adaptant
          à chaque terrain et infrastructure.
        </motion.p>

        {/* Mobile - horizontal rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:hidden flex flex-col gap-3"
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                variants={itemVariants}
                className="flex items-stretch overflow-hidden rounded-2xl border border-[#E8ECF4] bg-white"
              >
                {/* Image */}
                <div className="relative w-28 sm:w-48 flex-shrink-0">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 192px, 112px"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#E8F5EC] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#1B3D2C]" />
                    </div>
                    <h3 className="text-[#0A0F1E] font-semibold text-base sm:text-xl">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="text-[#4A5568] text-sm sm:text-base leading-snug sm:leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Desktop - grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                variants={itemVariants}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)]"
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1B3D2C]" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-[#0A0F1E] font-semibold text-lg mb-1.5">
                    {useCase.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
