import { useRecoilState } from "recoil";
import { sideNavAtom } from "@/store/applicationSettings";
import mobileSideNav from "@/assets/mobile-side-nav.svg";
import { cn } from "@/lib/utils";
import { SembTitle } from "@/components/sembTitle";
import { NewChatIcon } from "@/components/newChat";

export const MobileHeader = ({ className = "" }) => {
  const [sideNavState, setSideNavState] = useRecoilState(sideNavAtom);
  const toggleSideDrawer = () => {
    setSideNavState((state) => ({
      sideNavExpand: false,
      isDrawerOpen: !state.isDrawerOpen,
    }));
  };
  return (
    <header
      className={cn(
        "flex lg:hidden bg-background z-20 px-4 items-center justify-between sticky top-0",
        className
      )}
    >
      <div
        id="title-section"
        className="relative z-20 flex gap-3 h-full items-center"
      >
        <img
          src={mobileSideNav}
          onClick={toggleSideDrawer}
          className="lg:hidden h-[14px] cursor-pointer pt-[2px]"
        />
      </div>
      <SembTitle />
      <NewChatIcon />
    </header>
  );
};
