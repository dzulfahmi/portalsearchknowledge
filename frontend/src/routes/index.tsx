import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';
import AuthRoute from './AuthRoute';
import GuestRoute from './GuestRoute';

import NotFound from '../layouts/NotFound';
import Login from '../pages/auth/Login';
import CrawlerList from '../pages/crawler/List';
import Dashboard from '../pages/dashboard/Dashboard';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route path="" element={<AuthRoute><Dashboard /></AuthRoute>} />
      </Route>
      <Route path="/admin/crawler" element={<AdminLayout />}>
        <Route path="" element={<AuthRoute><CrawlerList /></AuthRoute>} />
      </Route>
      <Route path='*' element={<AuthRoute><NotFound /></AuthRoute>} />
    </Routes>
  );
}

export default Router;