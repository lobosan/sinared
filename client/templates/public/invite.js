Template.invite.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let token = FlowRouter.current().params.token;
    let handleInvites = SubsManagerInvitations.subscribe('invite', token);
    self.ready.set(handleInvites.ready());
  });
});

Template.invite.helpers({
  invitation: () => {
    var invite = Invitations.findOne();

    if (invite) {
      return invite;
    }
  }
});

Template.invite.events({
  'submit form': (event, template) => {
    event.preventDefault();

    let password = template.find('[name="password"]').value;

    let user = {
      name: template.find('[name="userName"]').value,
      email: template.find('[name="emailAddress"]').value,
      password: Accounts._hashPassword(password),
      token: FlowRouter.current().params.token
    };

    Meteor.call('acceptInvitation', user, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Meteor.loginWithPassword(user.email, password);
      }
    });
  }
});
