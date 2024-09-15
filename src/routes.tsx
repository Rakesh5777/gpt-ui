import App from "@/App";
import ErrorPage from "@/pages/errorPage";
import { createBrowserRouter, redirect } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/home/home";
import { Settings } from "./pages/settings.tsx/settings";
import { HeroSection } from "./pages/home/heroSection";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: loginLoader,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <HeroSection />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

async function loginLoader() {
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
  if (!token) return redirect("/signin");
  return null;
}
