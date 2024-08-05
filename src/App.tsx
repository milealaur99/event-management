import React from "react";
import { Navbar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { CreateEvent } from "./pages/CreateEvent";
import { SignUp } from "./pages/SingUp";
import { SignIn } from "./pages/SignIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import EventPage from "./pages/EventPage";
import { QueryClient, QueryClientProvider } from "react-query";

const LayoutComponent = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: <CreateEvent />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "event/:eventId",
        element: <EventPage />,
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
