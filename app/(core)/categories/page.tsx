"use client";
import { FC } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete";

const CategoriesPage: FC = () => {
  const { onOpen } = useNewCategory();

  const { data: categories, isLoading } = useGetCategories();
  const { mutate: deleteCategories, isPending } = useBulkDeleteCategories();

  const isDisabled = isPending || isLoading;

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full flex items-center justify-center">
              <Loader2Icon className="size-12 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categorias</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <PlusIcon className="size-4 mr-2" />
            Nova Categoria
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories || []}
            filterKey="name"
            filterName="Nome"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default CategoriesPage;
