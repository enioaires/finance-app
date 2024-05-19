"use client";
import { FC } from "react";
import { useUser } from "@clerk/nextjs";

export const WelcomeMsg: FC = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Bem-vindo de Volta{isLoaded ? ", " : " "}
        {user?.firstName} 👋
      </h2>
      <p className="text-sm lg:text-base text-slate-300">
        Esta é a visão geral das suas Finanças
      </p>
    </div>
  );
};
