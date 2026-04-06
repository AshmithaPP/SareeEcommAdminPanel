import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';
import AddProduct from '../pages/AddProduct/AddProduct';
import EditProduct from '../pages/EditProduct/EditProduct';
import Categories from '../pages/Categories/CategoryManagement';
import Orders from '../pages/Orders/Orders';
import OrderDetails from '../pages/Orders/OrderDetails';
import CustomerList from '../pages/Customers/CustomerList';
import ResetPassword from '../pages/Auth/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit" element={<EditProduct />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* 404 Route */}
      <Route path="*" element={<div className="text-center mt-5"><h4>Page Not Found</h4></div>} />
    </Routes>
  );
};

export default AppRoutes;
