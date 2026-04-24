"use client";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { components } from "@/lib/api-types";
import { useUIStore } from "@/store/use-ui-store";
import {
  IconBellRinging,
  IconChevronDown,
  IconCircleCheck,
  IconLogout,
  IconMenu2,
  IconSettings,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type NotificationItem = components["schemas"]["NotificationResponseDto"];

const NOW_ISO = "2026-04-24T12:00:00.000Z";
const THIRTY_FIVE_MINUTES_AGO_ISO = "2026-04-24T11:25:00.000Z";
const THREE_HOURS_AGO_ISO = "2026-04-24T09:00:00.000Z";

const URGENCY_BADGE: Record<NotificationItem["urgency"], string> = {
  LOW_GREEN: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  MEDIUM_YELLOW: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  CRITICAL_RED: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
};

export function Header() {
  const tSidebar = useTranslations("dashboard.sidebar");
  const t = useTranslations("dashboard.header");
  const locale = useLocale();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const mockNotifications: NotificationItem[] = [
    {
      id: "n1",
      title: t("notificationItems.upcomingPaymentTitle"),
      message: t("notificationItems.upcomingPaymentMessage"),
      urgency: "MEDIUM_YELLOW",
      isRead: false,
      referenceId: {},
      createdAt: NOW_ISO,
    },
    {
      id: "n2",
      title: t("notificationItems.criticalBudgetTitle"),
      message: t("notificationItems.criticalBudgetMessage"),
      urgency: "CRITICAL_RED",
      isRead: false,
      referenceId: {},
      createdAt: THIRTY_FIVE_MINUTES_AGO_ISO,
    },
    {
      id: "n3",
      title: t("notificationItems.successReportTitle"),
      message: t("notificationItems.successReportMessage"),
      urgency: "LOW_GREEN",
      isRead: true,
      referenceId: {},
      createdAt: THREE_HOURS_AGO_ISO,
    },
  ];

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const unreadCount = mockNotifications.filter((item) => !item.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-glass/60 border-b border-glass-border">
      <div className="flex justify-between items-center h-16 px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center rounded-full p-2.5 bg-glass border border-glass-border text-foreground/85 hover:text-foreground hover:bg-glass/80 transition-colors"
            aria-label={t("toggleSidebar")}
          >
            <IconMenu2 className="h-5 w-5" />
          </button>
          <h2 className="text-base sm:text-lg font-bold tracking-tight">
            {t("brandName")}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="relative inline-flex items-center justify-center rounded-full p-2.5 bg-glass border border-glass-border text-foreground/85 hover:text-foreground hover:bg-glass/80 transition-colors"
              aria-label={t("notifications")}
              aria-expanded={isNotificationsOpen}
            >
              <IconBellRinging className="h-4.5 w-4.5" />
              {unreadCount > 0 ? (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              ) : null}
            </button>

            {isNotificationsOpen ? (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-glass-border bg-glass/90 p-2 shadow-sm backdrop-blur-md">
                <div className="px-2 py-2 text-sm font-semibold text-foreground">
                  {t("notifications")}
                </div>

                <div className="max-h-80 space-y-1 overflow-auto pr-1">
                  {mockNotifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      className="w-full rounded-lg border border-transparent px-3 py-2 text-left transition-colors hover:border-glass-border hover:bg-foreground/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">
                          {notification.title}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            URGENCY_BADGE[notification.urgency]
                          }`}
                        >
                          {notification.urgency}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-foreground/75">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-foreground/60">
                        <span>
                          {new Date(notification.createdAt).toLocaleString(
                            locale,
                          )}
                        </span>
                        {notification.isRead ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-300">
                            <IconCircleCheck size={12} /> {t("read")}
                          </span>
                        ) : (
                          <span className="text-rose-500">{t("unread")}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <LanguageSwitcher />
          <ThemeToggle />

          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-2 py-1.5 text-sm font-semibold text-foreground/90 hover:bg-glass/80 transition-colors"
              aria-expanded={isUserMenuOpen}
              aria-label={t("userMenu")}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                H
              </span>
              <span className="hidden sm:block">{t("userName")}</span>
              <IconChevronDown
                size={16}
                className={`transition-transform ${
                  isUserMenuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isUserMenuOpen ? (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-glass-border bg-glass/90 p-2 shadow-sm backdrop-blur-md">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-foreground/8 hover:text-foreground transition-colors"
                >
                  <IconSettings size={16} />
                  {tSidebar("settings")}
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                  <IconLogout size={16} />
                  {tSidebar("logout")}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
