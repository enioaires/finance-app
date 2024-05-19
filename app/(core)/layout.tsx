import { Header } from "@/components/layout/header";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const CoreLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </div>
  );
};
export default CoreLayout;
