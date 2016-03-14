Template.sendInvitationModal.events({
  'submit form' (event, template) {
    event.preventDefault();

    let userName = template.find("[name='userName']").value,
      email = template.find("[name='emailAddress']").value,
      role = template.find("[name='roles'] option:selected").value;

    if (userName && email && role !== "") {
      Meteor.call("sendInvitation", {
        name: userName,
        email: email,
        role: role
      }, (error, response) => {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          $("#send-invitation-modal").modal('hide');
          $('.modal-backdrop').hide();
          Bert.alert("Invitación enviada exitosamente", "success");
        }
      });
    } else {
      Bert.alert("Por favor ingrese un nombre de usuario, un correo electrónico y seleccione un tipo de usario", "warning");
    }
  }
});
