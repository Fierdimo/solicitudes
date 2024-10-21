/* Importaciones */


import './usersCollection';
import './usersControllers';
import './usersMethods';
import './usersPublishs';


import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Configuración de las cuentas (opcional)
Accounts.config({
  forbidClientAccountCreation: false, // Permitir la creación de cuentas
});



Meteor.startup(async () => {
  /* Creacion de una cuenta como rol general */
  if (await Meteor.users.find().countAsync() === 0) {

    /* ===================================================== */
    Accounts.createUser({
      username: "general117",
      email: "general117@gmail.com",
      password: "1",
      profile: {
        id: 1,
        name: "General",
        lastname: "117",
        email: "general117@gmail.com",
        membreship: [
          ["admin", "Sistemas"],
          ["admin", "HSE"],
          ["admin", "GestionH"]
        ],
      }
    })
    Accounts.createUser({
      username: "jefe200",
      email: "jefe200@gmail.com",
      password: "1",
      profile: {
        id: 2,
        name: "Jefe",
        lastname: "200",
        email: "jefe200@gmail.com",
        membreship: [
          ["jefe", "Sistemas"],
          ["jefe", "HSE"],
          ["jefe", "GestionH"]
        ],
      }
    })
    Accounts.createUser({
      username: "lidersistemas",
      email: "pplanluis@gmail.com",
      // email: "jefesistemas@gmail.com",
      password: "1",
      profile: {
        id: 3,
        name: "Lider",
        lastname: "Sistemas",
        email: "pplanluis@gmail.com",
        membreship: [
          ["lider", "Sistemas"],
        ],
      }
    })
    Accounts.createUser({
      username: "liderhse",
      email: "pplanluis_2005@outlook.com",
      // email: "jefesistemas@gmail.com",
      password: "1",
      profile: {
        id: 3,
        name: "Lider",
        lastname: "hse",
        email: "pplanluis_2005@outlook.com",
        membreship: [
          ["lider", "HSE"],
        ],
      }
    })

    Accounts.createUser({
      username: "auxiliarsistemas",
      email: "pplanluis2005@gmail.com",
      // email: "auxiliarsistemas@gmail.com",
      password: "1",
      profile: {
        id: 4,
        name: "Auxiliar",
        lastname: "Sistemas",
        email: "pplanluis2005@gmail.com",
        membreship: [
          ["member", "Sistemas"],
          ["member", "HSE"]
        ]
      }
    })

  }
});