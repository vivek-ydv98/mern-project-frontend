// import logo from './logo.svg';
import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProductDetail from "./features/admin/components/AdminProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserOrdersPage from "./pages/UserOrdersPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import PageNotFound from "./pages/404";
import SignupPage from "./pages/SignupPage";
import Protected from "./features/auth/components/Protected";
import AdminHome from "./pages/AdminHome";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Logout from "./features/auth/components/Logout";
import Home from "./pages/Home";
import { fetchCartItemsAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import {checkAuthAsync,selectLoggedInUser,selectUserChecked,
} from "./features/auth/authSlice";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./pages/StripeCheckouts";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const options = { timeout: 5000, position: positions.TOP_CENTER };

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        {" "}
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetail></AdminProductDetail>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  { path: "/login", element: <LoginPage></LoginPage> },
  { path: "/signup", element: <SignupPage></SignupPage> },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  { path: "*", element: <PageNotFound></PageNotFound> },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  );
}

export default App;
