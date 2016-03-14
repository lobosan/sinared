Accounts.emailTemplates.resetPassword.siteName = () => Meteor.settings.public.appName;
Accounts.emailTemplates.resetPassword.from     = () => `${Meteor.settings.public.appName} <sgalindo@magap.gob.ec>`;
Accounts.emailTemplates.resetPassword.subject  = () => 'Restablecimiento de contraseña';

Accounts.emailTemplates.resetPassword.text = ( user, url ) => {
  let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "sgalindo@magap.gob.ec",
      emailBody      = `Un restablecimiento de contraseña ha sido solicitado para la cuenta vinculada al correo electrónico (${emailAddress}). \nPara restablecer su contraseña, visite la siguiente dirección:\n\n${urlWithoutHash}\n\n Si usted no hizo esta solicitud y cree que hubo un error, por favor contacte al administrador del sistema: ${supportEmail}.`;

  return emailBody;
};
