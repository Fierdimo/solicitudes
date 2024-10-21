import { htmlSendRequest, htmlStateSwitchRequest } from "../utilities/htmlEmail.utilities";
import { sendEmail } from "../utilities/sendEmail.utilities";
import { userProfileLookUp } from "../utilities/lookupWithAggregate.utilities";
import { Requests } from "./requestsCollection";
import { Meteor } from 'meteor/meteor';

export const getRequests = async (_id, lastPostDate) => {
  //Consulta del usuario por id
  var membreship = (await Meteor.users.findOneAsync({ _id: _id })).profile.membreship;

  let limit = 10; // Limite de solicitudes que retornara la consulta

  /* Objeto de los atributos que retornara la consulta */
  var itemsReturn = {
    _id: 1,
    senderId: 1,
    receiverId: 1,
    subject: 1,
    createdAt: 1,
    state: 1,
  }

  //varible para almacenar el resultado
  var result = {
    result: [],
    count: 0
  };

  //Se retorna todos las solicitudes que concuerden con el condicional
  if (membreship.some(f => f[0] === 'lider')) {
    var match = {
      $or: [
        { senderId: _id },
        {
          $and: [
            { receiverId: { $in: [_id] } },
          ]
        }
      ]
    }

    result.result = await Requests.rawCollection().aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: {
          createdAt: { $lt: lastPostDate },
          ...match
        }
      },
      { $project: itemsReturn },
      ...userProfileLookUp,
      { $limit: limit }

    ]).toArray();
    result.count = await Requests.find(match).countAsync();
  }

  //Se retorna todos las solicitudes si el rol se encuentra en la lista
  if (membreship.some(f => f[0] === 'jefe')) {
    result.result = await Requests.rawCollection().aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: {
          createdAt: { $lt: lastPostDate }
        }
      },
      { $project: itemsReturn },
      ...userProfileLookUp,
      { $limit: limit }

    ]).toArray();

    result.count = await Requests.find().countAsync();
  }


  if (membreship.some(f => f[0] !== 'jefe' && f[0] !== 'lider')) {
    var match = {
      $or: [
        { senderId: _id },
        {
          $and: [
            { receiverId: { $in: [_id] } },
            { state: { $in: [2] } },
          ]
        }
      ]
    }
    result.result = await Requests.rawCollection().aggregate([
      { $sort: { createdAt: -1 } },
      {
        $match: {
          createdAt: { $lt: lastPostDate },
          ...match
        }
      },
      { $project: itemsReturn },
      ...userProfileLookUp,
      { $limit: limit }
    ]).toArray();


    result.count = await Requests.find(match).countAsync();

  }
  return result;

}


export const sendRequests = async (
  leader,
  requestType,
  subject,
  content,
  files,
  senderId,
) => {
  try {
    //Cosulta de lider o jefe destinatario para obtener su _id
    const { _id, profile } = await Meteor.users.findOneAsync({
      "profile.membreship": {
        $elemMatch: {
          0: 'lider',           // El primer elemento debe ser "lider"
          1: leader[1]        // El segundo elemento es el area
        }
      }
    });

    // Metodo para insertar la solicitud
    Requests.insertAsync({
      senderId: senderId,
      receiverId: _id,
      requestType: requestType,
      subject: subject,
      content: content,
      createdAt: new Date(),
      files: files,
      state: 0,
      observations: ''
    })
      .then(async (res) => {
        //Envio de solicitud a destinatario que seria el lider o jefe
        sendEmail(profile.email, "Nueva solicitud", htmlSendRequest(profile.email, subject))
        return res;
      })
      .catch(err => {
        return err;
      })


  } catch (err) {
    console.error(err)
  }
}

export const consultRequestById = async (_id) => {
  return (await Requests.rawCollection().aggregate([
    {
      $match: {
        _id: _id
      }
    },
    ...userProfileLookUp
  ]).toArray())[0];
}

export const stateSwitchRequest = async (_id, state, observations) => {
  try {
    Requests.findOneAsync({ _id: _id }).then(async (r) => {
      const { senderId, subject } = r;
      var senderEmail = (await Meteor.users.findOneAsync({ _id: senderId })).profile.email;
      Requests.updateAsync({ _id }, {
        $set: {
          'state': state,
          'observations': observations
        }
      }).then(res => {
        sendEmail(senderEmail, "Estado de la solicitud", htmlStateSwitchRequest(subject, state, observations))
        //sendEmail(receiverEmail, "pplanluis@gmail.com", htmlStateSwitchRequest(senderEmail, subject, state)
      })
      return res;
    })
      .catch(err => {
        return err;
      })
  } catch (err) {
    console.error(err)
  }
}
