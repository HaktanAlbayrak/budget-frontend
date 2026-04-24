import { ChartsSection } from "@/components/dashboard/charts-section";
import { HealthReport } from "@/components/dashboard/health-report";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const userName = "Haktan";

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t("welcome", { name: userName })}
        </h1>
        <p className="mt-2 text-foreground/70">
          Finans durumunun özetini anında gör.
        </p>
      </div>

      <OverviewCards />
      <ChartsSection />
      <HealthReport />
    </section>
  );
}
