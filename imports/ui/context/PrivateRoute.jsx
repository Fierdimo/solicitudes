import { Meteor } from 'meteor/meteor';

import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext';
import { routes } from '../utilities/Routes.utilities';
import { Tracker } from 'meteor/tracker';
import { Loading } from '../components/loading';

// Componente para proteger rutas
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isAllowed, setIsAllowed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirige al login si no está autenticado
    if (!isAuthenticated) {
      window.location.href = "/";
    }
    const tracker = Tracker.autorun(() => {
      if (!Meteor.user()) {
        return
      }

      // Obtener la membresía del usuario
      const userMembreship = (Meteor.user()?.profile?.membreship || []).map(i => i[0])

      var path = (routes.filter(item => item.path === window.location.pathname))[0];

      // Verificar si el usuario tiene algún rol permitido en la ruta
      for (let i = 0; i < userMembreship.length; i++) {
        if (path.roles.includes(userMembreship[i])) {
          setIsAllowed(true);
          setIsLoading(false);
        }
      }
      //Varifica si el resultado es un false detenga la carga
      if (!isAllowed) {
        setIsLoading(false);
      }
    });
    // Limpieza del efecto
    return () => {
      tracker.stop();
    };
  },)


  if (isLoading) {
    return <Loading />
  }

  //Valida si esta permitido muesta el componente hijo
  if (isAllowed) {
    return children;
  }

  //Se vefifica si no esta permitido lo envie a la direción de no permitido
  if (!isAllowed) {
    window.location.href = "/forbidden";
  }
};