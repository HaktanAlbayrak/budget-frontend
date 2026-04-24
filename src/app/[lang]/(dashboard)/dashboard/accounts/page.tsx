import { AccountCard } from "@/components/dashboard/accounts/account-card";
import { CreateAccountDialog } from "@/components/dashboard/accounts/create-account-dialog";
import { mockAccounts } from "@/lib/mock-data";
import { getTranslations } from "next-intl/server";

export default async function DashboardAccountsPage() {
  const t = await getTranslations("accounts");

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <CreateAccountDialog />
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockAccounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </section>
  );
}
