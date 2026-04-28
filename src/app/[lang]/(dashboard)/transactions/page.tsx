"use client";

import { TransactionFormDialog } from "@/components/dashboard/transactions/transaction-form-dialog";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTransactions } from "@/lib/mock-data";
import { IconDots, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import * as React from "react";

export default function TransactionsPage() {
  const t = useTranslations("transactions");
  const [query, setQuery] = React.useState("");
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any | null>(null);

  const filtered = mockTransactions.filter((tx) => {
    if (!query) return true;
    return [tx.description, tx.category?.name, tx.account?.name]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  function onEdit(tx: any) {
    setSelected(tx);
    setFormOpen(true);
  }

  function onDelete(tx: any) {
    setSelected(tx);
    setDeleteOpen(true);
  }

  function handleConfirmDelete() {
    // For now just close and log
    console.log("Deleted", selected);
    setDeleteOpen(false);
  }

  return (
    <section>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              setSelected(null);
              setFormOpen(true);
            }}
          >
            <IconPlus size={16} />
            <span className="ml-2">{t("add")}</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Input
          placeholder={t("search") as string}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mt-6 overflow-hidden bg-background/50 backdrop-blur-sm border border-border rounded-xl shadow-sm p-4">
        <Table>
          <TableHeader>
            <tr>
              <TableHead>{t("columns.date")}</TableHead>
              <TableHead>{t("columns.description")}</TableHead>
              <TableHead>{t("columns.category")}</TableHead>
              <TableHead>{t("columns.account")}</TableHead>
              <TableHead className="text-right">
                {t("columns.amount")}
              </TableHead>
              <TableHead className="text-right">
                {t("columns.actions")}
              </TableHead>
            </tr>
          </TableHeader>

          <TableBody>
            {filtered.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>
                  <Badge>{tx.category?.name}</Badge>
                </TableCell>
                <TableCell>{tx.account?.name}</TableCell>
                <TableCell
                  className={
                    tx.type === "INCOME"
                      ? "text-emerald-500 text-right"
                      : "text-red-500 text-right"
                  }
                >
                  {tx.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <IconDots />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onEdit(tx)}>
                        <IconEdit size={14} />
                        <span className="ml-2">{t("edit")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(tx)}
                        className="text-destructive"
                      >
                        <IconTrash size={14} />
                        <span className="ml-2">{t("delete")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TransactionFormDialog
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
        transaction={selected ?? undefined}
      />

      <ConfirmDeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
