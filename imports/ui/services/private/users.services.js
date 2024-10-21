import { Meteor } from 'meteor/meteor';

//Función para obtener todos los usuarios
export const getUsers = async (setUsers, setUserLoading, setError) => {
  Meteor.call('getUsers', (error, result) => {
    if (error) {
      setError(error);
      return error;
    } else {
      setUsers(result);
      setUserLoading(false);
      return result;
    }
  })
}
//Función para eliminar un usuario por el id
export const deleteUser = async (_id, setResult, setError) => {
  if (!setResult) setResult = () => { }
  if (!setError) setResult = () => { }
  Meteor.call("deleteUser", _id, (error, result) => {
    if (error) {
      setError(error);
      return error;
    } else {
      setResult(result);
      return result;
    }
  })
}


//Función para obtener todos los usuarios para los mensajes
export const getUsersForMessages = async (setUsers, setUserLoading, setError) => {
  Meteor.call('getUsersForMessages', (error, result) => {
    if (error) {
      setError(error);
      return error;
    } else {
      setUsers(result);
      setUserLoading(false);
      return result;
    }
  })
}