import { CategoryCard } from "@/components/dashboard/categories/category-card";
import { CreateCategoryDialog } from "@/components/dashboard/categories/create-category-dialog";
import { mockCategories } from "@/lib/mock-data";
import { getTranslations } from "next-intl/server";

export default async function DashboardCategoriesPage() {
  const t = await getTranslations("categories");

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <CreateCategoryDialog />
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
