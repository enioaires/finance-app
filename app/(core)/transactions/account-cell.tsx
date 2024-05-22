import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { FC } from "react";

type Props = {
  account: string;
  accountId: string;
};

export const AccountCell: FC<Props> = ({ account, accountId }) => {
  const { onOpen } = useOpenAccount();

  const onClick = () => {
    onOpen(accountId);
  };
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
};
