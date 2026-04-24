"use client";

import type { components } from "@/lib/api-types";
import {
  IconBuildingBank,
  IconCash,
  IconCreditCard,
  IconWallet,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

type Account = components["schemas"]["AccountResponseDto"];

type AccountCardProps = {
  account: Account;
};

const ACCOUNT_ICON_BY_TYPE = {
  BANK: IconBuildingBank,
  CREDIT_CARD: IconCreditCard,
  CASH: IconCash,
  PERSON: IconWallet,
} as const;

export function AccountCard({ account }: AccountCardProps) {
  const t = useTranslations("accounts");
  const locale = useLocale();
  const AccountIcon = ACCOUNT_ICON_BY_TYPE[account.type] ?? IconWallet;

  const formattedBalance = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: account.currency,
    maximumFractionDigits: 2,
  }).format(account.balance);

  return (
    <article className="rounded-2xl border border-glass-border bg-glass/50 p-6 shadow-sm transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
            <AccountIcon size={22} />
          </span>
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            {account.name}
          </h3>
        </div>

        <span className="rounded-full border border-glass-border bg-glass px-3 py-1 text-xs font-semibold text-foreground/80">
          {t(`types.${account.type}`)}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground/60">
          {t("balance")}
        </p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          {formattedBalance}
        </p>
      </div>

      {account.type === "CREDIT_CARD" ? (
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-foreground/60">
          <span>
            {t("statementDay")} {account.statementDay ?? "-"}
          </span>
          <span>
            {t("dueDay")} {account.dueDay ?? "-"}
          </span>
        </div>
      ) : null}
    </article>
  );
}
