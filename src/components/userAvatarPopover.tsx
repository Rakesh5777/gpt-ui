import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "@/store/userDetails";
import React from "react";
import useLocalStorage from "@/hooks/localStorage";

const sideNavList = [
  {
    name: "Settings",
    icon: GearIcon,
    path: "/settings",
  },
];

const UserAvatarPopover = ({ showName = false }) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [popover, setPopover] = React.useState(false);
  const [_token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setToken("");
    navigate("/signin");
  };

  return (
    <Popover open={popover} onOpenChange={setPopover}>
      <PopoverTrigger className="flex gap-2 items-center cursor-pointer w-full">
        <Avatar>
          <AvatarFallback>
            {userDetails.username?.slice(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {showName && userDetails.username}
      </PopoverTrigger>
      <PopoverContent className="mt-1">
        <Card className="border-none p-0 shadow-none">
          <CardHeader className="p-0">
            <CardTitle>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {userDetails.username?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="truncate">{userDetails.username}</span>
                  <span className="text-sm text-gray-500 truncate">
                    {userDetails.email}
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-6">
            {sideNavList.map((item) => (
              <NavLink
                to={item.path}
                onClick={() => setPopover(false)}
                className={({ isActive }) =>
                  `flex items-center font-medium gap-3 cursor-pointer whitespace-nowrap rounded-md hover:bg-primary/5 h-9 px-4 py-2 leading-none ${
                    isActive ? "bg-primary/5" : ""
                  }`
                }
                key={item.name}
              >
                {<item.icon className="h-12 w-5" />} {item.name}
              </NavLink>
            ))}
            <div className="to-transparent bg-primary/10 h-[1px] my-4"></div>
            <a
              onClick={handleSignOut}
              type="submit"
              className={`flex items-center font-medium gap-3 cursor-pointer whitespace-nowrap rounded-md hover:bg-primary/5 h-9 px-4 py-2 leading-none`}
            >
              <ExitIcon className="h-12 w-5" /> Sign Out
            </a>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatarPopover;
