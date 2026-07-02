import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact · Hive Robotics",
  description:
    "Contactez Hive Robotics pour équiper votre site de robots de livraison autonomes ou demander une démo.",
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white pt-10 lg:pt-0">
      <Contact />
    </main>
  );
}
