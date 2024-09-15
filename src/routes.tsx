import App from "@/App";
import ErrorPage from "@/pages/errorPage";
import { createBrowserRouter, redirect } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Customers } from "@/pages/customers/customers";
import { Settings } from "./pages/settings.tsx/settings";
import { CreateCustomer } from "@/pages/customers/components/createCreate";
import { CustomerDashboard } from "./pages/customers/components/customerDashboard";
import { Home } from "./pages/home/home";

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
      },
      {
        path: "/customers",
        element: <Customers />,
        children: [
          {
            path: "",
            element: <CustomerDashboard />,
          },
          {
            path: "create",
            element: <CreateCustomer />,
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
