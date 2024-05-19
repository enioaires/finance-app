import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const HeaderLogo: FC = () => {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
      </div>
    </Link>
  );
};
