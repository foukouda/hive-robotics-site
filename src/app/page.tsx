import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { SocialProof } from "@/components/sections/social-proof";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-white focus:outline-none">
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <SocialProof />
      <Testimonials />
    </main>
  );
}
