import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Loading } from '../components/loading';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado de autenticación

  useEffect(() => {
    // Verifica la autenticación cuando el componente carga
    const computation = Tracker.autorun(() => {
      setIsAuthenticated(!!Meteor.userId());
    });

    // Limpiar el autorun cuando el componente se desmonta
    return () => computation.stop();
  }, []);

  if (isAuthenticated === null) {
    // Mientras se está verificando el estado de autenticación
    return (
      <Loading/>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
