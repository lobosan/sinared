let resetPassword = (options) => {
  _validate(options.form, options.template);
};

let _validate = (form, template) => {
  $(form).validate(validation(template));
};

let validation = (template) => {
  return {
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: "Ingrese una nueva contraseña por favor",
        minlength: "Utilice al menos 6 caracteres"
      },
      repeatNewPassword: {
        required: "Repita su nueva contraseña por favor",
        equalTo: "Las contraseñas no coinciden, intente nuevamente",
        minlength: "Utilice al menos 6 caracteres"
      }
    },
    submitHandler() {
      _handleReset(template);
    }
  };
};

let _handleReset = (template) => {
  var token = FlowRouter.current().params.token,
    password = template.find('[name="newPassword"]').value;

  Accounts.resetPassword(token, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Contraseña cambiada', 'success');
    }
  });
};

Modules.client.resetPassword = resetPassword;
