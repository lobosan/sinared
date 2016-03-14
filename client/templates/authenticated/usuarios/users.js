Template.users.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleUsers = SubsManagerUsers.subscribe('users');
    let handleInvitations = SubsManagerInvitations.subscribe('invitations');
    self.ready.set(handleUsers.ready());
    self.ready.set(handleInvitations.ready());
  });
});

Template.users.helpers({
  users: () => {
    var users = Meteor.users.find();

    if (users) {
      return users;
    }
  },
  hasInvitations: () => {
    var invitations = Invitations.find().count();
    return invitations < 1 ? false : true;
  },
  invitations: () => {
    var invitations = Invitations.find();

    if (invitations) {
      return invitations;
    }
  }
});

Template.users.events({
  'change [name="userRole"]': function (event, template) {
    let role = $(event.target).find('option:selected').val();

    Meteor.call("setRoleOnUser", {
      user: this._id,
      role: role
    }, (error, response) => {
      if (error) {
        Bert.alert(error.reason, "warning");
      }
    });
  },
  'click .revoke-invite': function (event, template) {
    if (confirm("Está seguro? Esta acción es permanente.")) {
      Meteor.call("revokeInvitation", this._id, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          Bert.alert("Invitación revocada!", "success");
        }
      });
    }
  }
});
