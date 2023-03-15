import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import Add from "./components/Add/Add";
import Edit from "./components/Edit/Edit";

function App() {
  const Layout = () => {
    return (
      <div>
        <NavBar />
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          // errorElement: <ErrorPage />,
        },

        {
          path: "/addnew",
          element: <Add />,
          // errorElement: <ErrorPage />,
        },

        {
          path: "/update/:id",
          element: <Edit />,
          // errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
