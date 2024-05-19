import { FC } from "react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

const Page: FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-main">Bem vindo de Volta!</h1>
          <p className="text-base text-other">
            Entre ou Crie uma conta para ver seu Dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>

          <ClerkLoading>
            <Loader2Icon className="w-8 h-8 text-muted-foreground animate-spin" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-emerald-300 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" height={450} width={450} />
      </div>
    </div>
  );
};

export default Page;
