import Header from "@/layouts/header/header";
import { SideNav } from "@/layouts/sidenav";

export const Home = () => {
  return (
    <>
      <div className="h-full w-full flex">
        <SideNav />
        <div className="h-full w-full flex flex-col">
          <Header className="shrink-0 h-14" />
          <div className="h-full w-full flex flex-col justify-center items-center p-4">
            <h3 className="text-xl font-bold tracked-tight dark:opacity-90">
              Welcome to Semb
            </h3>
            <p className="text-muted-foreground text-center my-1">
              Semb is a chat application
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
