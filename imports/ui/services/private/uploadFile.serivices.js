import { requestsFilesCollection } from "../../../api/filesConnection/filesCollection";


export function deleteFile(_id) {
  requestsFilesCollection.remove({ _id });
}
/* export function uploadFile(fileData, index, callback) {
  const upload = requestsFilesCollection.insert(
    {
      file: fileData,
      chunkSize: "dynamic",
    },
    false
  );

  var fileId = upload.config.fileId;

  upload.on("start", function () {
    console.log("cargando archivo...");
  });

  upload.on("end", (error, fileObj) => {
    if (error) console.log(error);
    else {
      console.log("archivo cargado...");
      callback(fileId, fileObj, index);
      //   responseFn("Archivo cargado con exito", "success");
    }
  });
  upload.start();
}
 */


export function uploadFile(fileData) {
  return new Promise((resolve, reject) => {
    const upload = requestsFilesCollection.insert(
      {
        file: fileData,
        chunkSize: "dynamic",
      },
      false
    );
    upload.on("start", function () {
      console.log("cargando archivo...");
    });

    upload.on("end", (error, fileObj) => {
      if (error) reject(error);
      else {
        fileObj['fileId'] = upload.config.fileId
        console.log("archivo cargado...");
        resolve(fileObj);
        // callback(fileId, fileObj, index);
        //   responseFn("Archivo cargado con exito", "success");
      }
    });
    upload.start();
  })
}


export const getFileById = async (fileId, collectionId) => {
  try {
    return new Promise((resolve, reject) => {
      Meteor.call('getFileById', fileId, collectionId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  } catch (error) {
    console.error('Error al obtener el archivo:', error);
  }
}


export const getFileLink = async (fileId, collectionId) => {
  try {
    return new Promise((resolve, reject) => {
      Meteor.call('getFileLink', fileId, collectionId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  } catch (error) {
    console.error('Error al obtener el archivo:', error);
  }
}