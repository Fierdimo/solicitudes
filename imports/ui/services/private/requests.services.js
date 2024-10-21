import { Meteor } from "meteor/meteor";
import { fileToBase64 } from "../../adapters/files.adapters";
import { uploadFile } from "./uploadFile.serivices";
import { Random } from "meteor/random";

/* Funci{on para obtner todas las solicitudes respectiva */
export const getRequests = (lastPostDate) => {
  return new Promise((resolve, reject) => {
    Meteor.call('requests.getRequests', lastPostDate, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
};


/* Función para realizar el énvio de la solicitud */
export const sendRequest = async (
  { leader,
    requestType,
    subject,
    content,
    files }
) => {
  // Retornamos una promesa que se resolverá cuando Meteor.call complete su ejecución
  return new Promise(async (resolve, reject) => {
    var filesId = [];
    if (files.length > 0) {
      // Espera a que todas las subidas terminen antes de continuar
      const uploadPromises = files.map((fileData, i) => {
        return uploadFile(fileData, i); // Sube el archivo y retorna una promesa con el fileId
      });

      // `filesId` se llenará con los IDs de los archivos una vez que todas las promesas se resuelvan
      const resultFilesId = await Promise.all(uploadPromises);

      filesId = resultFilesId.map(f => {
        return {
          _id: f.fileId,
          name: f.name,
          type: f.type,
          size: f.size
        }
      }) // Añade todos los IDs de archivos subidos a `filesId`

      if (filesId.length !== resultFilesId.length) {
        reject("Error in upload files");
      }
    }

    Meteor.call("requests.sendRequests",
      leader,
      requestType,
      subject,
      content,
      filesId,
      (error, result) => {
        if (error) {
          reject(error); // Si hay un error, la promesa se rechaza
        } else {
          resolve(result); // Si todo va bien, la promesa se resuelve con el resultado
        }
      });
  });
};


/* Función para realizar la consulta de una solicitud por el "_id" */

export const consultRequestById = (_id) => {
  return new Promise((resolve, reject) => {
    Meteor.call("requests.consultRequestById", _id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
}


export const stateSwitchRequest = (_id, state, observations) => {
  return new Promise((resolve, reject) => {
    Meteor.call('requests.stateSwitchRequest', _id, state, observations, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}



export const deleteRequests = (_id) => {
  return new Promise((resolve, reject) => {
    Meteor.call("request.deleteRequest", _id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
}