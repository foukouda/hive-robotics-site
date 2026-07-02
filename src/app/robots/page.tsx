import type { Metadata } from "next";
import { Robots } from "@/components/sections/robots";
import { UseCases } from "@/components/sections/use-cases";
import { HowItWorks } from "@/components/sections/how-it-works";

export const metadata: Metadata = {
  title: "Robots · Hive Robotics",
  description:
    "Hive Compact et Hive Cargo : jusqu'à 250 kg de charge, 50 km d'autonomie, navigation LiDAR + IA. Cas d'usage et fonctionnement.",
};

export default function RobotsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white pt-10 lg:pt-0">
      <Robots />
      <UseCases />
      <HowItWorks />
    </main>
  );
}
