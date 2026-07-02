import type { Metadata } from "next";
import { Sovereignty } from "@/components/sections/sovereignty";
import { Impact } from "@/components/sections/impact";
import { NvidiaInception } from "@/components/sections/nvidia-inception";
import { Press } from "@/components/sections/press";
import { Team } from "@/components/sections/team";

export const metadata: Metadata = {
  title: "À propos · Hive Robotics",
  description:
    "Hive Robotics : robotique de livraison souveraine et française, impact environnemental, presse, partenaire NVIDIA Inception et équipe.",
};

export default function AProposPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[#F7F9FC] pt-10 lg:pt-0">
      <Sovereignty />
      <Impact />
      <NvidiaInception />
      <Press />
      <Team />
    </main>
  );
}
