import { FC } from "react";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { AccountForm } from "./account-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet: FC = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Essa ação não pode ser desfeita."
  );

  const { data: currentAccount, isLoading } = useGetAccount(id);

  const { mutate: editAccount, isPending: isPendingEdit } = useEditAccount(id);
  const { mutate: deleteAccount, isPending: isPendingDelete } =
    useDeleteAccount(id);

  const isPending = isPendingEdit || isPendingDelete;

  const defaultValues = currentAccount
    ? {
        name: currentAccount.name,
      }
    : { name: "" };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAccount(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    editAccount(values, {
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
          <SheetHeader className="font-semibold">Editar Conta</SheetHeader>
          <SheetDescription>
            Edite os campos da conta e clique em Salvar para confirmar.
          </SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
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
