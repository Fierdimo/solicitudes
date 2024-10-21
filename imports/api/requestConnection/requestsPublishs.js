import { Meteor } from 'meteor/meteor';
import { Requests } from './requestsCollection';

if (Meteor.isServer) {
  Meteor.publish('allRequests', function publishRequests() {
    return Requests.find({}, { fields: {} }); // Publish all Requests
  });
}