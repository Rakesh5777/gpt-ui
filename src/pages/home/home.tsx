import { NewChatInput } from "@/pages/home/newChatInput";
import Header from "@/layouts/header/header";
import { SideNav } from "@/layouts/sidenav";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="h-full w-full flex">
        <SideNav />
        <div className="h-full w-full flex flex-col">
          <Header className="shrink-0 h-14" />
          <div className="grow flex flex-col md:w-[72%] md:mx-auto">
            <Outlet />
            <NewChatInput className="shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
};
