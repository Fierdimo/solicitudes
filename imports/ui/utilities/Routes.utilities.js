
//Lista de rutas con los roles declarados para cada rol
export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    roles: ["admin"],
  },
  {
    path: "/requests",
    name: "Solicitudes",
    roles: ["admin", "lider", "member", "jefe"],
  }
];
