let login = (options) => {
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
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Ingrese un correo electrónico.',
        email: 'Es un correo electrónico legítimo?'
      },
      password: {
        required: 'Ingrese su contraseña.'
      }
    },
    submitHandler() {
      _handleLogin(template);
    }
  };
};

let _handleLogin = (template) => {
  let email = template.find('[name="emailAddress"]').value,
    password = template.find('[name="password"]').value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      if (error.reason === 'User not found') Bert.alert('Usuario no encontrado', 'warning');
      else if (error.reason === 'Incorrect password') Bert.alert('Contraseña incorrecta', 'warning');
      else Bert.alert(error.reason, 'warning');
    }
  });
};

Modules.client.login = login;
