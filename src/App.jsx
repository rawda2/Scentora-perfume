import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Favourite from "./Components/Favs/Favs";
import Cart from "./Components/Cart/Cart";
import { CartProvider } from "./Components/CartContext"; // Import the CartProvider
import Dashboard from "./Components/Dashboard/Dashboard";
import Intro from "./Components/Intro/Intro";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Intro /> },
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "Favourite", element: <Favourite /> },
      { path: "cart", element: <Cart /> },
      { path: "dash", element: <Dashboard /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },

  

      { path: "intro", element: <Intro/> },


    ],
  },
]);

function App() {
  return (
    <CartProvider> {/* Wrap the RouterProvider with CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;