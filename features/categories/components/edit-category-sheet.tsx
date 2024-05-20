import { FC } from "react";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { insertCategoriesSchema } from "@/db/schema";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { CategoryForm } from "./category-form";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet: FC = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Essa ação não pode ser desfeita."
  );

  const { data: currentCategory, isLoading } = useGetCategory(id);

  const { mutate: editCategory, isPending: isPendingEdit } =
    useEditCategory(id);
  const { mutate: deleteCategory, isPending: isPendingDelete } =
    useDeleteCategory(id);

  const isPending = isPendingEdit || isPendingDelete;

  const defaultValues = currentCategory
    ? {
        name: currentCategory.name,
      }
    : { name: "" };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteCategory(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    editCategory(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader className="font-semibold">Editar Categoria</SheetHeader>
          <SheetDescription>
            Edite os campos da categoria e clique em Salvar para confirmar.
          </SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              defaultValues={defaultValues}
              disabled={isPending}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
