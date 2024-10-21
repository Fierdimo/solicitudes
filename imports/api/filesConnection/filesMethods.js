import { Meteor } from "meteor/meteor";
import {
  backgroundCollection,
  curricullumsCollection,
  requestsFilesCollection
} from "./filesCollection";

const collection = {
  background: backgroundCollection,
  curricullums: curricullumsCollection,
  requests: requestsFilesCollection
};

function replaceBaseUrl(link) {
  return link.replace("http://localhost/", Meteor.absoluteUrl());
}

Meteor.methods({
  async getFileById(id, collectionId) {
    const collectionType = collection[`${collectionId}`];
    return await requestsFilesCollection.collection.find({ _id: id }).fetch();
  },
  async getFileLink(id, collectionName) {
    let result = await requestsFilesCollection.collection.find({ _id: id }).fetch();
    return (
      result.map(function (fileRef) {
        return {
          link: replaceBaseUrl(collection[`${collectionName}`].link(fileRef)),
          id: fileRef._id,
        };
      })
        .filter((dataLink) => dataLink.id == id))[0];
  },
});
