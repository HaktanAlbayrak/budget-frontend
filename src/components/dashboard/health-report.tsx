import { mockHealthReport } from "@/lib/mock-data";

function scoreClass(totalScore: number) {
  if (totalScore < 50) {
    return "text-rose-500";
  }

  if (totalScore <= 80) {
    return "text-amber-500";
  }

  return "text-emerald-500";
}

export function HealthReport() {
  const { totalScore, healthStatus, advices } = mockHealthReport;

  return (
    <section className="w-full rounded-2xl border border-glass-border bg-glass/60 p-6 backdrop-blur-md">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4 md:w-64">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-current ${scoreClass(totalScore)}`}
          >
            <span className="text-xl font-extrabold">{totalScore}/100</span>
          </div>
          <div>
            <p className="text-sm text-foreground/70">Finansal Sağlık</p>
            <p className={`text-lg font-bold ${scoreClass(totalScore)}`}>
              {healthStatus}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {advices.map((advice) => (
            <div
              key={advice.code}
              className="rounded-xl border border-glass-border bg-glass/50 px-4 py-3 text-sm text-foreground/90"
            >
              {advice.message}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
