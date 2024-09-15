import sideBarRight from "@/assets/sidebar-right.svg";
import { NewChatIcon } from "@/components/newChatIcon";
import { SembTitle } from "@/components/sembTitle";
import UserAvatarPopover from "@/components/userAvatarPopover";
import { cn } from "@/lib/utils";
import { sideNavAtom } from "@/store/applicationSettings";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const DesktopHeader = ({ className = "" }) => {
  const [sideNavState, setSideNavState] = useRecoilState(sideNavAtom);
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavState((state) => ({
      isDrawerOpen: false,
      sideNavExpand: !state.sideNavExpand,
    }));
  };

  return (
    <header
      className={cn(
        "hidden lg:flex bg-background z-20 px-4 items-center justify-between",
        className
      )}
    >
      <div
        id="title-section"
        className="relative z-20 flex gap-3 h-full items-center"
      >
        {!sideNavState.sideNavExpand && (
          <div className="flex gap-1">
            <div className="h-10 flex w-10 justify-center items-center rounded-xl hover:bg-primary-foreground">
              <img
                src={sideBarRight}
                onClick={toggleSideNav}
                className="hidden lg:block cursor-pointer leading-none"
              />
            </div>
            <NewChatIcon divClassName="hover:bg-primary-foreground" />
          </div>
        )}
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          <SembTitle />
        </span>
      </div>
      <div
        id="avatar-section"
        className="relative z-20 h-full flex gap-3 items-center select-none"
      >
        <UserAvatarPopover />
      </div>
    </header>
  );
};
