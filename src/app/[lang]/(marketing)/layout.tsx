import { Footer } from "@/components/marketing/footer";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getTranslations } from "next-intl/server";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();

  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="fixed top-0 left-0 w-full z-50 bg-glass/60 backdrop-blur-md border-b border-glass-border">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between text-foreground">
          <div className="text-xl font-bold tracking-tight">
            {t("brandName")}
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="flex-1 pt-24 pb-16">{children}</div>

      <Footer />
    </div>
  );
}
