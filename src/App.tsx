import Header from "@/layouts/header";
import { SideNav } from "@/layouts/sidenav";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {mockGetUserDetails} from "./services/api";
import { userDetailsAtom } from "./store/userDetails";
import lightBg from "@/assets/home-light.svg";

function App() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const user = await mockGetUserDetails();
        setUserDetails(user);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        navigate("/signin");
      }
    };
    if (!userDetails?.username) {
      getDetails();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div
      className={`${
        isLoading ? "opacity-0" : "opacity-100"
      } relative transition-opacity ease-in-out h-screen w-screen`}
    >
      <div className="absolute h-full w-full top-0 left-0 bg-gray-300 dark:bg-gray-950 opacity-10 dark:opacity-35"></div>
      <img
        className="dark:hidden absolute top-0 left-0 h-full w-full object-cover z-[-10]"
        src={lightBg}
        alt="no-data-found"
      />
      <img
        className="hidden dark:block absolute top-0 left-0 h-full w-full object-cover z-[-10]"
        src={lightBg}
        alt="no-data-found"
      />
      <Outlet />
    </div>
  );
}

export default App;
