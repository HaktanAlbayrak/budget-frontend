"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-full bg-glass border border-glass-border text-foreground/80 hover:text-foreground hover:bg-glass/80 transition-all active:scale-95 shadow-sm"
      aria-label="Temayı Değiştir"
    >
      {/* KARANLIK TEMA: Güneş ikonunu göster, Ay'ı gizle */}
      <Sun className="hidden h-4.5 w-4.5 dark:block" />

      {/* AYDINLIK TEMA: Ay ikonunu göster, Güneş'i gizle */}
      <Moon className="block h-4.5 w-4.5 dark:hidden" />
    </button>
  );
}
