Meteor.publish('invite', (token) => {
  check(token, String);
  return Invitations.find({"token": token});
});

Meteor.publish('invitations', () => {
  return Invitations.find({});
});
