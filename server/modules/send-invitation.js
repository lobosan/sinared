let _insertInvitation = (invite) => {
  console.log(invite);
  Invitations.insert(invite);
};

let _prepareEmail = (options) => {
  let siteDomain = Meteor.settings.private.siteDomain;
  let url = `http://${ siteDomain }/invite/${ options.token }`;

  SSR.compileTemplate('invitation', Assets.getText('email/templates/invitation.html'));
  let html = SSR.render('invitation', {url: url, name: options.name});

  return html;
};

let _sendInvitation = (email, content) => {
  Meteor.defer(function () {
    Email.send({
      to: email,
      from: "Santiago Galindo <sgalindo@magap.gob.ec>",
      subject: `Invitación para participar en el sistema ${Meteor.settings.public.appName}`,
      html: content
    });
  });
};

let invitation = (options) => {
  _insertInvitation(options);
  var email = _prepareEmail(options);
  _sendInvitation(options.email, email);
};

Modules.server.sendInvitation = invitation;
