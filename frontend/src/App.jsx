import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import AdminRoute from "./components/protectedRoute/AdminRoute.jsx";
import Start from "./components/protectedRoute/Start.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Payment = lazy(() => import("./pages/Payment.jsx"));
const AdminLogin = lazy(() => import("./pages/Admin/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard.jsx"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Start />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search/:name" element={<Search />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/setting" element={<Settings />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
            <Route path="admin/login" element={<AdminLogin />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
