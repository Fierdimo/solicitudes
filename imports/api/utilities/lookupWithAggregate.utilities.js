/* Estructura para la consulta del usuario origen y destino en
las consultas de los request  con aggregate
*/

export const userProfileLookUp = [
  {
    $lookup: {
      from: "users",
      localField: "senderId",
      foreignField: "_id",
      as: "senderUser",
      //se obtine los datos de los atributos deseados
      pipeline: [
        {
          $project: {
            _id: 0,
            "profile.name": 1,
            "profile.lastname": 1,
            "profile.email": 1,
          }
        }
      ]
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "receiverId",
      foreignField: "_id",
      as: "receiverUser",
      //se obtine los datos de los atributos deseados
      pipeline: [
        {
          $project: {
            _id: 0,
            "profile.name": 1,
            "profile.lastname": 1,
            "profile.email": 1,
          }
        }
      ]
    }
  }
]