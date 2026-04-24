"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function CreateAccountDialog() {
  const t = useTranslations("accounts");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconPlus size={18} />
          {t("addAccount")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createModal.title")}</DialogTitle>
        </DialogHeader>

        <form className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">{t("createModal.name")}</Label>
            <Input id="account-name" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="account-type">{t("createModal.type")}</Label>
              <select
                id="account-type"
                className="h-11 w-full rounded-xl border border-glass-border bg-glass/50 px-3 text-sm text-foreground outline-none backdrop-blur-md"
                defaultValue="BANK"
              >
                <option value="BANK">{t("types.BANK")}</option>
                <option value="CREDIT_CARD">{t("types.CREDIT_CARD")}</option>
                <option value="CASH">{t("types.CASH")}</option>
                <option value="PERSON">{t("types.PERSON")}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-currency">
                {t("createModal.currency")}
              </Label>
              <select
                id="account-currency"
                className="h-11 w-full rounded-xl border border-glass-border bg-glass/50 px-3 text-sm text-foreground outline-none backdrop-blur-md"
                defaultValue="TRY"
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GOLD">GOLD</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-balance">{t("createModal.balance")}</Label>
            <Input id="account-balance" type="number" step="0.01" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="statement-day">
                {t("createModal.statementDay")}
              </Label>
              <Input id="statement-day" type="number" min={1} max={31} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-day">{t("createModal.dueDay")}</Label>
              <Input id="due-day" type="number" min={1} max={31} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="glass">{t("createModal.cancel")}</Button>
            </DialogClose>
            <Button>{t("createModal.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
