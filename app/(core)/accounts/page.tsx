"use client";
import { FC } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

const AccountsPage: FC = () => {
  const { onOpen } = useNewAccount();

  const { data: accounts, isLoading } = useGetAccounts();
  const { mutate: deleteAccounts, isPending } = useBulkDeleteAccounts();

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
          <CardTitle className="text-xl line-clamp-1">Contas</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <PlusIcon className="size-4 mr-2" />
            Nova Conta
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts || []}
            filterKey="name"
            filterName="Nome"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AccountsPage;
