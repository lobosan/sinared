Invitations = new Meteor.Collection('invitations');
SubsManagerInvitations = new SubsManager();

Invitations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Invitations.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "User name."
  },
  email: {
    type: String,
    label: "Email to send invitation to."
  },
  token: {
    type: String,
    label: "Invitation token."
  },
  role: {
    type: String,
    label: "Role to apply to the user."
  },
  date: {
    type: String,
    label: "Invitation Date"
  }
}));
