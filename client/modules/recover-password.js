let recoverPassword = (options) => {
  _validate(options.form, options.template);
};

let _validate = (form, template) => {
  $(form).validate(validation(template));
};

let validation = (template) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Ingrese su correo electrónico.',
        email: 'Es un correo electrónico legítimo?'
      }
    },
    submitHandler() {
      _handleRecovery(template);
    }
  };
};

let _handleRecovery = (template) => {
  let email = template.find('[name="emailAddress"]').value;

  Accounts.forgotPassword({email: email}, (error) => {
    if (error) {
      if (error.reason === 'User not found') Bert.alert('Usuario no encontrado', 'warning');
      else Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('El enlace para crear una nueva contraseña ha sido enviado a su dirección de correo electrónico', 'success');
    }
  });
};

Modules.client.recoverPassword = recoverPassword;
