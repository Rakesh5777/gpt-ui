import mobileSideNav from "@/assets/mobile-side-nav.svg";
import sideBarLeft from "@/assets/sidebar-left.svg";
import { NewChatIcon } from "@/components/newChatIcon";
import { PreviousConversation } from "@/components/previousConversation";
import UserAvatarPopover from "@/components/userAvatarPopover";
import { sideNavAtom } from "@/store/applicationSettings";
import { useRecoilState } from "recoil";

export const SideNav = () => {
  return (
    <>
      <MobileDrawer />
      <DesktopSideNav />
    </>
  );
};

const MobileDrawer = () => {
  const [sideNavState, setSideNavState] = useRecoilState(sideNavAtom);

  const toggleSideDrawer = () => {
    setSideNavState((state) => ({
      sideNavExpand: false,
      isDrawerOpen: !state.isDrawerOpen,
    }));
  };

  return (
    <>
      {sideNavState.isDrawerOpen && (
        <div
          id="overlay"
          className={`absolute z-30 top-0 h-full w-full bg-primary/40`}
          onClick={() => {
            setSideNavState((state) => ({
              isDrawerOpen: false,
              sideNavExpand: false,
            }));
          }}
        ></div>
      )}
      <aside
        className={`absolute z-30 top-0 h-full transition-all overflow-hidden flex flex-col max-w-[320px] ${
          sideNavState.isDrawerOpen ? "w-2/3" : "w-0"
        } bg-primary-foreground`}
      >
        <header className="h-14 flex shrink-0 justify-between items-center px-4">
          <img
            src={mobileSideNav}
            onClick={toggleSideDrawer}
            className="lg:hidden h-[14px] cursor-pointer pt-[2px]"
          />
          <NewChatIcon />
        </header>
        <div className="flex-1">
          <PreviousConversation />
        </div>
        <footer className="shrink-0 h-14 flex items-center px-4">
          <UserAvatarPopover showName={true} />
        </footer>
      </aside>
    </>
  );
};

const DesktopSideNav = () => {
  const [sideNavState, setSideNavState] = useRecoilState(sideNavAtom);
  const toggleSideNav = () => {
    setSideNavState((state) => ({
      isDrawerOpen: false,
      sideNavExpand: !state.sideNavExpand,
    }));
  };

  return (
    <>
      <aside
        className={`shrink-0 hidden lg:block h-full transition-all overflow-hidden flex flex-col bg-primary-foreground ${
          sideNavState.sideNavExpand ? "w-1/5" : "w-0"
        }`}
      >
        <header className="shrink-0 h-14 flex items-center justify-between px-2">
          <div className="h-10 flex w-10 justify-center items-center rounded-xl hover:bg-secondary">
            <img
              src={sideBarLeft}
              onClick={toggleSideNav}
              className="hidden lg:block cursor-pointer leading-none"
            />
          </div>
          <NewChatIcon />
        </header>
        <div className="flex-1">
          <PreviousConversation />
        </div>
      </aside>
    </>
  );
};
