Meteor.methods({
  sendInvitation(invitation) {
    check(invitation, {
      name: String,
      email: String,
      role: String
    });

    try {
      Modules.server.sendInvitation({
        name: invitation.name,
        email: invitation.email,
        token: Random.hexString(16),
        role: invitation.role,
        date: ( new Date() ).toISOString()
      });
    } catch (exception) {
      return exception;
    }
  }
});
