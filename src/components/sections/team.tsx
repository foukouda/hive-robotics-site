"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Member = { name: string; role: string; initials: string };

// TODO: remplacer par les vrais membres, rôles et (si voulu) photos.
const team: Member[] = [
  { name: "Thomas Raynal", role: "Co-fondateur", initials: "TR" },
  { name: "Teddy Leclercq", role: "Co-fondateur", initials: "TL" },
];

export function Team() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="hive-label">À propos</p>
            <h2 className="hive-heading text-[#0A0F1E]">
              La robotique de livraison,{" "}
              <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-[6px] underline-offset-[0.12em]">
                made in France.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center gap-5"
          >
            <p className="hive-body">
              Hive Robotics conçoit et fabrique des robots de livraison
              autonomes, avec une conviction : la mobilité du dernier mètre doit
              être plus sûre, plus propre et souveraine.
            </p>
            <p className="text-[#4A5568] leading-relaxed">
              Née de plus de 7 ans de R&amp;D en robotique, l&apos;entreprise est
              incubée au Pôle Léonard de Vinci et accompagnée par Bpifrance, la
              French Tech et le programme NVIDIA Inception.
            </p>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="hive-card flex items-center gap-4"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1B3D2C] to-[#00C853] text-lg font-semibold text-white">
                {member.initials}
              </div>
              <div>
                <p className="font-semibold text-[#0A0F1E]">{member.name}</p>
                <p className="text-sm text-[#4A5568]">{member.role}</p>
              </div>
            </motion.div>
          ))}

          {/* Recruitment card */}
          <motion.a
            href="mailto:thomas.raynal@hiverobotics.fr?subject=Candidature%20Hive%20Robotics"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: team.length * 0.08 }}
            className="group flex items-center justify-between gap-4 rounded-3xl border border-dashed border-[#1B3D2C]/30 p-8 transition-colors hover:border-[#1B3D2C] hover:bg-[#F4FAF6] lg:p-10"
          >
            <div>
              <p className="font-semibold text-[#1B3D2C]">On recrute</p>
              <p className="text-sm text-[#4A5568]">Rejoignez l&apos;équipe</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#1B3D2C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
