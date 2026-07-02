import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "FAQ · Hive Robotics",
  description:
    "Questions fréquentes sur les robots Hive : charge, autonomie, sécurité, déploiement.",
};

export default function FaqPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[#F7F9FC] pt-10 lg:pt-0">
      <Faq />
    </main>
  );
}
