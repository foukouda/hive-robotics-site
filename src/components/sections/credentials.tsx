"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, ShieldCheck } from "lucide-react";

interface Credential {
  name: string;
  src?: string;
  height: number;
  caption: string;
}

interface CredentialGroup {
  title: string;
  icon: typeof Award;
  items: Credential[];
}

const groups: CredentialGroup[] = [
  {
    title: "Conformité & technique",
    icon: ShieldCheck,
    items: [
      {
        name: "Marquage CE",
        height: 44,
        caption: "Certification européenne obtenue",
      },
      {
        name: "NVIDIA Inception",
        src: "/images/press/nvidia_logo.svg",
        height: 28,
        caption: "Programme startups deep tech",
      },
      {
        name: "Décret 2024-1063",
        height: 44,
        caption: "Robots autorisés sur trottoir FR",
      },
    ],
  },
  {
    title: "Accélérateurs & incubateurs",
    icon: Award,
    items: [
      {
        name: "Moove Lab Batch 15",
        src: "/images/logo_partners/moove_lab_logo.jpeg",
        height: 44,
        caption: "Mobilians x Via ID - Station F",
      },
      {
        name: "Station F",
        src: "/images/logo_partners/Logo_STATION_F.svg.png",
        height: 32,
        caption: "Campus startups mondial",
      },
      {
        name: "Pôle Léonard de Vinci",
        src: "/images/logo_partners/pole_leonard_de_vinci_logo.png",
        height: 48,
        caption: "Incubateur ESILV - La Défense",
      },
      {
        name: "CNAM",
        src: "/images/logo_partners/cnam_logo.gif",
        height: 32,
        caption: "Incubateur Conservatoire des Arts et Métiers",
      },
      {
        name: "Village by CA Brie Picardie",
        src: "/images/logo_partners/village_by_ca_brie_picardie_logo.png",
        height: 48,
        caption: "Incubateur Crédit Agricole",
      },
    ],
  },
  {
    title: "Soutiens & investisseurs",
    icon: Award,
    items: [
      {
        name: "Bpifrance",
        src: "/images/logo_partners/bpifrance_logo.svg",
        height: 28,
        caption: "Financement public innovation",
      },
      {
        name: "Via ID",
        src: "/images/logo_partners/via_id_logo.svg",
        height: 32,
        caption: "Fonds mobilité durable",
      },
      {
        name: "Mobilians",
        src: "/images/logo_partners/mobilians_logo.png",
        height: 40,
        caption: "Organisation pro mobilité",
      },
      {
        name: "Réseau Entreprendre 95",
        src: "/images/logo_partners/reseau_entreprendre_95_logo.svg",
        height: 44,
        caption: "Prêts d'honneur entrepreneurs",
      },
    ],
  },
];

export function Credentials() {
  return (
    <section className="hive-section bg-[#F7F9FC]">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="hive-label">Labels & soutiens</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Reconnu par les{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">
              meilleurs.
            </span>
          </h2>
          <p className="text-base text-[#4A5568] mt-4 max-w-2xl">
            Nos certifications, programmes d&apos;accélération et soutiens
            institutionnels.
          </p>
        </motion.div>

        {/* 3 groups */}
        <div className="space-y-12">
          {groups.map((group, gIndex) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: gIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EC] flex items-center justify-center">
                    <GroupIcon className="w-4 h-4 text-[#1B3D2C]" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-[#0A0F1E]">
                    {group.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white rounded-xl border border-[#E8ECF4] p-5 flex flex-col items-center text-center hover:border-[#00E85C]/40 transition-colors"
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0 mb-3"
                        style={{ height: item.height + 8 }}
                      >
                        {item.src ? (
                          <Image
                            src={item.src}
                            alt={item.name}
                            width={item.height * 4}
                            height={item.height}
                            className="w-auto object-contain"
                            style={{ height: item.height, width: "auto" }}
                          />
                        ) : (
                          <span className="font-mono text-sm font-bold text-[#1B3D2C] px-3 py-2 bg-[#E8F5EC] rounded-md">
                            {item.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#4A5568] leading-tight">
                        {item.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
