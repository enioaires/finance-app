import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useConfirm } from "@/hooks/use-confirm";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  id: string;
};

export const CellActions: FC<Props> = ({ id }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Essa ação não pode ser desfeita."
  );
  const { mutate: deleteAccount, isPending } = useDeleteAccount(id);
  const { onOpen } = useOpenAccount();

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAccount();
    }
  };
  return (
    <div>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem disabled={isPending} onClick={() => onOpen(id)}>
            <EditIcon className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
            <TrashIcon className="size-4 mr-2" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
