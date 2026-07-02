import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageShellProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPageShell({
  title,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#4A5568] hover:text-[#1B3D2C] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0F1E] mb-4">
          {title}
        </h1>

        {lastUpdated && (
          <p className="text-sm text-[#4A5568] mb-12">
            Dernière mise à jour : {lastUpdated}
          </p>
        )}

        <div className="mb-12 rounded-2xl border border-[#FFE8A3] bg-[#FFF8E1] p-5 text-sm text-[#6B5B1F]">
          <p className="font-semibold mb-1">Document en cours de rédaction</p>
          <p>
            Cette page sera disponible dans sa version définitive avant la mise
            en ligne publique de la campagne. Pour toute question, contactez
            l&apos;équipe à{" "}
            <a
              href="mailto:thomas.raynal@hiverobotics.fr"
              className="underline font-medium hover:text-[#1B3D2C]"
            >
              thomas.raynal@hiverobotics.fr
            </a>
            .
          </p>
        </div>

        <article className="prose prose-neutral max-w-none text-[#2D3748] leading-relaxed [&_h2]:text-[#0A0F1E] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[#0A0F1E] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1">
          {children}
        </article>
      </div>
    </main>
  );
}
