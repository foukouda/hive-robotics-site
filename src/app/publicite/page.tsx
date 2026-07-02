import type { Metadata } from "next";
import { Advertising } from "@/components/sections/advertising";

export const metadata: Metadata = {
  title: "Publicité · Hive Robotics",
  description:
    "Vos robots deviennent un média mobile : écrans embarqués au cœur des flux. Régie partenaire Rainbooh.",
};

export default function PublicitePage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[#1B3D2C] pt-10 lg:pt-0">
      <Advertising />
    </main>
  );
}
