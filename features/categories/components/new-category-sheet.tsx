import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { z } from "zod";
import { insertCategoriesSchema } from "@/db/schema";
import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../api/use-create-category";
import { CategoryForm } from "./category-form";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewCategorySheet: FC = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="font-semibold">Nova Categoria</SheetHeader>
        <SheetDescription>
          Adicione uma nova categoria para começar a rastrear suas finanças.
        </SheetDescription>
        <CategoryForm
          onSubmit={onSubmit}
          onDelete={() => {}}
          defaultValues={{ name: "" }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
