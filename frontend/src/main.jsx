import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Error from "./pages/Error";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "expense", element: <Expense /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "docs", element: <Docs /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact", element: <Contact /> },
      { path: "product", element: <Product /> },

      // ✅ Clerk authentication routes styled with spacing
      {
        path: "sign-in/*",
        element: (
          <div className="flex justify-center mt-24">
            <SignIn routing="path" path="/sign-in" />
          </div>
        ),
      },
      {
        path: "sign-up/*",
        element: (
          <div className="flex justify-center mt-24">
            <SignUp routing="path" path="/sign-up" />
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
