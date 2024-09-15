import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { mockGetUserDetails } from "./services/api";
import { userDetailsAtom } from "./store/userDetails";

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
      } h-screen w-screen relative transition-opacity ease-in-out flex flex-col h-screen`}
    >
      <Outlet />
    </div>
  );
}

export default App;
