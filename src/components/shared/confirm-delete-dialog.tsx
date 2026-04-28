"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: ConfirmDeleteDialogProps) {
  const t = useTranslations("shared.deleteConfirm");

  return (
    <AlertDialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={onConfirm}
            >
              {isLoading ? (
                <svg
                  className="mr-2 inline-block animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 38 38"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    transform="translate(1 1)"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <circle
                      strokeOpacity="0.2"
                      stroke="currentColor"
                      cx="18"
                      cy="18"
                      r="18"
                    />
                    <path
                      d="M36 18c0-9.94-8.06-18-18-18"
                      stroke="currentColor"
                    ></path>
                  </g>
                </svg>
              ) : null}

              {t("confirm")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
