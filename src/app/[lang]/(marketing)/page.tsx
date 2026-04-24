import { AnimatedHero } from "@/components/marketing/animated-hero";
import { FeaturesSection } from "@/components/marketing/features-section";

export default async function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* 1. Kısım: Hero (Karşılama) Alanı - Tam ekran kaplasın */}
      <div className="container mx-auto px-6 min-h-[90vh] flex flex-col justify-center items-center">
        <AnimatedHero />
      </div>

      {/* 2. Kısım: Özellikler (Features) Alanı */}
      <FeaturesSection />
    </div>
  );
}
