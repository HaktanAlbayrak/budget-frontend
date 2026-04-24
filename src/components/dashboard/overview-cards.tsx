"use client";

import { mockFinancialData } from "@/lib/mock-data";
import { useState } from "react";

type RangeTab = "month" | "quarter" | "year";

const TABS: Array<{ key: RangeTab; label: string }> = [
  { key: "month", label: "Bu Ay" },
  { key: "quarter", label: "Son 3 Ay" },
  { key: "year", label: "Bu Yıl" },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function valueClass(value: number) {
  return value < 0 ? "text-rose-500" : "text-emerald-500";
}

export function OverviewCards() {
  const [activeTab, setActiveTab] = useState<RangeTab>("month");
  const { summary } = mockFinancialData;

  return (
    <section className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass/50 p-1 shadow-sm">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-glass/80 text-foreground border border-glass-border"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-glass-border bg-glass/50 p-5 shadow-sm">
          <p className="text-sm font-medium text-foreground/70">
            Toplam Net Değer
          </p>
          <p
            className={`mt-3 text-2xl font-bold ${valueClass(summary.totalNetWorth)}`}
          >
            {formatCurrency(summary.totalNetWorth)}
          </p>
        </article>

        <article className="rounded-2xl border border-glass-border bg-glass/50 p-5 shadow-sm">
          <p className="text-sm font-medium text-foreground/70">Aylık Gelir</p>
          <p
            className={`mt-3 text-2xl font-bold ${valueClass(summary.monthlyIncome)}`}
          >
            {formatCurrency(summary.monthlyIncome)}
          </p>
        </article>

        <article className="rounded-2xl border border-glass-border bg-glass/50 p-5 shadow-sm">
          <p className="text-sm font-medium text-foreground/70">Aylık Gider</p>
          <p
            className={`mt-3 text-2xl font-bold ${valueClass(-summary.monthlyExpense)}`}
          >
            {formatCurrency(summary.monthlyExpense)}
          </p>
        </article>
      </div>
    </section>
  );
}
