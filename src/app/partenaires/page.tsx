import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Travailler avec nous · Hive Robotics",
  description:
    "Commerçants, restaurateurs, artisans : proposez la livraison autonome par les robots Hive à vos clients. Devenez partenaire.",
};

export default function PartenairesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white pt-10 lg:pt-0">
      <Contact
        eyebrow="Travailler avec nous"
        titleLead="Faites livrer votre "
        titleAccent="commerce."
        intro="Commerçant, restaurateur ou artisan ? Proposez la livraison autonome par nos robots à vos clients, sans logistique à gérer. Parlez-nous de votre activité, on s'occupe du reste."
        subjectPrefix="Partenariat commerçant"
      />
    </main>
  );
}
