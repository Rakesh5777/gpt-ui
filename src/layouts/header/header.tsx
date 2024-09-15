import { DesktopHeader } from "./desktopHeader";
import { MobileHeader } from "./mobileHeader";

const Header = ({ className = "" }: { className?: string }) => {
  return (
    <>
      <DesktopHeader className={className} />
      <MobileHeader className={className} />
    </>
  );
};

export default Header;
