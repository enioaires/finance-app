"use client";
import { FC } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { DataTable } from "@/components/ui/data-table";
import { Payment, columns } from "./columns";

const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "1mail",
  },
  {
    id: "2",
    amount: 200,
    status: "processing",
    email: "2mail",
  },
  {
    id: "3",
    amount: 300,
    status: "success",
    email: "3mail",
  },
  {
    id: "4",
    amount: 400,
    status: "failed",
    email: "4mail",
  },
];

const AccountsPage: FC = () => {
  const { onOpen } = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Contas</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <PlusIcon className="size-4 mr-2" />
            Nova Conta
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="email"
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AccountsPage;
