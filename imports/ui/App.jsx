import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './context/PrivateRoute';

import esES from 'antd/es/locale/es_ES'; // Configuración de español

// Carga perezosa de vistas
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
import { Requests } from './pages/Requests/Requests';
import { Login } from './pages/Login/Login';

import './index.css';

import { Loading } from './components/loading';
import { Forbidden } from './pages/Forbidden/Forbidden';

export const App = () => {
  return (
    <ConfigProvider locale={esES}>
      <AuthProvider>
        <Router>
          <Suspense fallback={
            <Loading />
          }>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Rutas protegidas con el wrapper PrivateRoute */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/requests" element={
                <PrivateRoute>
                  <Requests />
                </PrivateRoute>
              } />
              <Route path='/forbidden' element={<Forbidden />}></Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};
