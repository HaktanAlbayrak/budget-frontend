"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockAccounts, mockCategories } from "@/lib/mock-data";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface TransactionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: any;
}

const schema = z.object({
  amount: z.number().min(0.01),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
  date: z.string().min(1),
  description: z.string().optional(),
  accountId: z.string().optional(),
  categoryId: z.string().optional(),
});

export function TransactionFormDialog({
  isOpen,
  onClose,
  transaction,
}: TransactionFormDialogProps) {
  const t = useTranslations("transactions");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: transaction?.amount ?? undefined,
      type: transaction?.type ?? "EXPENSE",
      date: transaction?.date ?? new Date().toISOString().slice(0, 10),
      description: transaction?.description ?? "",
      accountId: transaction?.account?.id ?? mockAccounts[0]?.id,
      categoryId: transaction?.category?.id ?? mockCategories[0]?.id,
    },
  });

  React.useEffect(() => {
    if (transaction) {
      setValue("amount", transaction.amount);
      setValue("type", transaction.type);
      setValue("date", transaction.date?.slice(0, 10));
      setValue("description", transaction.description || "");
      setValue("accountId", transaction.account?.id || mockAccounts[0]?.id);
      setValue("categoryId", transaction.category?.id || mockCategories[0]?.id);
    }
  }, [transaction, setValue]);

  const onSubmit = (data: any) => {
    const parsed = schema.safeParse({
      ...data,
      amount:
        typeof data.amount === "string" ? Number(data.amount) : data.amount,
    });
    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    // For now just log and close. Caller can handle real save.
    console.log("Save transaction:", parsed.data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction ? t("edit") : t("add")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t("form.amount")}</Label>
              <Input {...register("amount")} type="number" step="0.01" />
              {errors.amount && (
                <p className="text-xs text-destructive">
                  {String(errors.amount?.message)}
                </p>
              )}
            </div>

            <div>
              <Label>{t("form.type")}</Label>
              <select
                {...register("type")}
                className="h-11 w-full rounded-xl border border-glass-border bg-glass/50 px-3 text-sm text-foreground outline-none backdrop-blur-md"
              >
                <option value="INCOME">{t("types.INCOME")}</option>
                <option value="EXPENSE">{t("types.EXPENSE")}</option>
                <option value="TRANSFER">{t("types.TRANSFER")}</option>
              </select>
            </div>

            <div>
              <Label>{t("form.date")}</Label>
              <Input {...register("date")} type="date" />
            </div>

            <div>
              <Label>{t("form.description")}</Label>
              <Input {...register("description")} />
            </div>

            <div>
              <Label>Account</Label>
              <select
                {...register("accountId")}
                className="h-11 w-full rounded-xl border border-glass-border bg-glass/50 px-3 text-sm text-foreground outline-none backdrop-blur-md"
              >
                {mockAccounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Category</Label>
              <select
                {...register("categoryId")}
                className="h-11 w-full rounded-xl border border-glass-border bg-glass/50 px-3 text-sm text-foreground outline-none backdrop-blur-md"
              >
                {mockCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                {t("form.cancel")}
              </Button>
            </DialogClose>
            <Button type="submit" className="w-36">
              {t("form.save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
