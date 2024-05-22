import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { useCreateTransaction } from "../api/use-create-transaction";
import { TransactionForm } from "./transaction-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Loader2Icon } from "lucide-react";

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet: FC = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createTransactionMutation = useCreateTransaction();

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

  const isPending =
    isCategoryPending ||
    isAccountPending ||
    createTransactionMutation.isPending;

  const isLoading = isCategoryLoading || isAccountLoading;

  const onSubmit = (values: FormValues) => {
    createTransactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="font-semibold">Nova Transação</SheetHeader>
        <SheetDescription>Adicione uma nova Transação.</SheetDescription>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
