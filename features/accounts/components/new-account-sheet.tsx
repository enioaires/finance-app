import { FC } from "react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { AccountForm } from "./account-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet: FC = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();

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
        <SheetHeader className="font-semibold">Nova Conta</SheetHeader>
        <SheetDescription>
          Adicione uma nova conta para começar a rastrear suas finanças.
        </SheetDescription>
        <AccountForm
          onSubmit={onSubmit}
          onDelete={() => {}}
          defaultValues={{ name: "" }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
