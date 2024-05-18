import { FC } from "react";
import { UserButton } from "@clerk/nextjs";

const Home: FC = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
