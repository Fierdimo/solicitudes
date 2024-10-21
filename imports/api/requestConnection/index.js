/* Importaciones */
import './requestsCollection';
import './requestsControllers';
import './requestsMethods';
import './requestsPublishs';



import { Requests } from "./requestsCollection";


Meteor.startup(async () => {
  /* Creacion de una cuenta como rol general */
  if (await Requests.find().countAsync() === 1) {

  }
});
