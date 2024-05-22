import { FC } from "react";
import { useGetTransaction } from "../api/use-get-transaction";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { TransactionForm } from "./transaction-form";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet: FC = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Essa ação não pode ser desfeita."
  );

  const { data: categories, isLoading: isCategoryLoading } = useGetCategories();
  const { mutate: createCategory, isPending: isCategoryPending } =
    useCreateCategory();

  const onCreateCategory = (name: string) => {
    createCategory({ name });
  };

  const categoryOptions = (categories ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const { data: accounts, isLoading: isAccountLoading } = useGetAccounts();
  const { mutate: createAccount, isPending: isAccountPending } =
    useCreateAccount();

  const onCreateAccount = (name: string) => {
    createAccount({ name });
  };

  const accountOptions = (accounts ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const { data: currentTransaction, isLoading: isTransactionLoading } =
    useGetTransaction(id);

  const { mutate: editTransaction, isPending: isPendingEdit } =
    useEditTransaction(id);
  const { mutate: deleteTransaction, isPending: isPendingDelete } =
    useDeleteTransaction(id);

  const isPending =
    isPendingEdit ||
    isPendingDelete ||
    isTransactionLoading ||
    isCategoryPending ||
    isAccountPending;

  const isLoading =
    isCategoryLoading || isAccountLoading || isTransactionLoading;

  const defaultValues = currentTransaction
    ? {
        accountId: currentTransaction.accountId,
        categoryId: currentTransaction.categoryId,
        amount: currentTransaction.amount.toString(),
        date: currentTransaction.date
          ? new Date(currentTransaction.date)
          : new Date(),
        payee: currentTransaction.payee,
        notes: currentTransaction.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteTransaction(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    editTransaction(values, {
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
          <SheetHeader className="font-semibold">Editar Transação</SheetHeader>
          <SheetDescription>
            Edite os campos da transação e clique em Salvar para confirmar.
          </SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
