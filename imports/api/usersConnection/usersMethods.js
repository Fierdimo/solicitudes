import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";

import { getUsers, registerUser, updateUser, deleteUser } from "./usersControllers";

Meteor.methods({
  'getUsers': function () {
    return getUsers(this.userId);
  },
  'registerUser': async (data) => {
    check(data, Object);

    await registerUser(data);
  },
  'updateUser': async (_id, data) => {
    check(_id, String);
    check(data, Object);

    await updateUser(_id, data);
  },
  'deleteUser': async (_id) => {
    check(_id, String);

    await deleteUser(_id);
  }
})