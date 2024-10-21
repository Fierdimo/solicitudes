import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";
import { consultRequestById, getRequests, sendRequests, stateSwitchRequest } from './requestsControllers';

Meteor.methods({
  'requests.getRequests': async function (lastPostDate) {
    let lastPostDate_ = lastPostDate || new Date();
    return await getRequests(this.userId, lastPostDate_);
  },
  'requests.sendRequests': async function (
    leader,
    requestType,
    subject,
    content,
    files
  ) {

    check(leader, Array);
    check(requestType, Number);
    check(subject, String);
    check(content, String);
    check(files, Array);

    await sendRequests(
      leader,
      requestType,
      subject,
      content,
      files,
      this.userId
    )
  },
  'requests.consultRequestById': async function (_id) {
    return await consultRequestById(_id);
  },
  'requests.stateSwitchRequest': async function (_id, state, observations) {
    check(_id, String);
    check(state, Number);
    check(observations, String);

    await stateSwitchRequest(_id, state, observations);

  }
});