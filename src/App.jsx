// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSession } from './components/userSlice';
import { Router, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import Toast from './layouts/Toast';
import AddProduct from './pages/Products/addProduct';
import UpdateProduct from './pages/Products/updateProduct';
import ViewOrder from './pages/Orders/viewOrder';
import UpdateOrder from './pages/Orders/updateOrder';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <HashRouter>
    <Router>
      <Routes>
      <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/" />}
        />
        <Route
          path="/customers"
          element={isAuthenticated ? <Customers /> : <Navigate to="/" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <Orders /> : <Navigate to="/" />}
        />
        <Route
          path="/payments"
          element={isAuthenticated ? <Payments /> : <Navigate to="/" />}
        />
        <Route
          path="/products/add-product"
          element={isAuthenticated ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/products/update-product/:productId"
          element={isAuthenticated ? <UpdateProduct /> : <Navigate to="/" />}
        />
         <Route
          path="/orders/view-order/:orderId"
          element={isAuthenticated ? <ViewOrder /> : <Navigate to="/" />}
        />
        <Route
          path="/orders/update-order/:orderId"
          element={isAuthenticated ? <UpdateOrder /> : <Navigate to="/" />}
        />
      </Routes>
      <Toast />
    </Router>
    </HashRouter>
    
  );
}

export default App;
