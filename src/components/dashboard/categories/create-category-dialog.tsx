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

export function CreateCategoryDialog() {
  const t = useTranslations("categories");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconPlus size={18} />
          {t("addCategory")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createModal.title")}</DialogTitle>
        </DialogHeader>

        <form className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">{t("createModal.name")}</Label>
            <Input id="category-name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-type">{t("createModal.type")}</Label>
            <select
              id="category-type"
              className="h-11 w-full rounded-xl border border-glass-border bg-glass/50 px-3 text-sm text-foreground outline-none backdrop-blur-md"
              defaultValue="EXPENSE"
            >
              <option value="INCOME">{t("types.INCOME")}</option>
              <option value="EXPENSE">{t("types.EXPENSE")}</option>
              <option value="TRANSFER">{t("types.TRANSFER")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category-icon">{t("createModal.icon")}</Label>
              <Input id="category-icon" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-color">{t("createModal.color")}</Label>
              <Input id="category-color" type="color" className="h-11 p-2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly-limit">
              {t("createModal.monthlyLimit")}
            </Label>
            <Input id="monthly-limit" type="number" min={0} step="1" />
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
