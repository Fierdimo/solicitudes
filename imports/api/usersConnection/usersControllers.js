import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Requests } from '../requestConnection/requestsCollection';

//Función para obtener todo los usuarios
export function getUsers(_id) {
  try {
    return Meteor.users.find({ $and: [{ "profile.id": { $ne: 1 } }, { "_id": { $ne: _id || 1 } }] }).fetch();
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Función para registrar un usuario
export const registerUser = async (data) => {
  await Accounts.createUserAsync({
    email: String(data.email).trim(),
    password: String(data.password).trim(),
    username: "",
    profile: {
      name: String(data.name).trim(),
      lastname: String(data.lastname).trim(),
      roles: [data.rol]
    }

  })
}
//Función para actualizar  usuario
export const updateUser = async (_id, data) => {
  await Meteor.users.updateAsync({ _id: _id }, {
    $set: {
      "emails.0.address": data.email,
      "profile.id": data.id,
      "profile.name": data.name,
      "profile.lastname": data.lastname,
      "profile.roles.0": data.rol
    }
  });
  if (data.password) {
    await updatePassword(_id, data.password)
  }
}

//Función para actualizar la contraseña
export const updatePassword = async (_id, password) => {
  await Accounts.setPasswordAsync(_id, String(password));
}


//Función para eliminar el usuario por el "_id"
export const deleteUser = async (_id) => {
  await Meteor.users.removeAsync(_id);
}



const brr = () => {
  return new Promise((resolve, reject) => {
    Meteor.users.rawCollection().aggregate([
      {
        $match: {
          "profile.membreship": {
            $elemMatch: { $elemMatch: { $eq: "Sistemas" } }
          }
        }
      },
    ]).toArray((err, res) => {
      if (err) {
        reject(err);  // En caso de error, se rechaza la promesa
      } else {
        resolve(res); // Si no hay error, resolvemos con el resultado
      }
    });
  });
};

/* (async () => {
  try {
    const result = await brr();
    console.log(result);  // Aquí puedes usar el resultado de la agregación
  } catch (error) {
    console.error("Error:", error);  // Captura y maneja cualquier error
  }
})();
 */