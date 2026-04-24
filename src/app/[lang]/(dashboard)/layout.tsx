import { getTranslations } from "next-intl/server";
import { DashboardShell } from "../../../components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("marketing.footer");
  const currentYear = new Date().getFullYear();
  const footerText = t("copyright", { year: currentYear });

  return <DashboardShell footerText={footerText}>{children}</DashboardShell>;
}
