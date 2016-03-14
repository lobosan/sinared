Template.nuevaRed.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = SubsManagerDPA.subscribe('dpa');
    let handleOrganizaciones = SubsManagerOrganizaciones.subscribe('organizaciones');
    let handleCialcos = SubsManagerCialcos.subscribe('cialcos');
    self.ready.set(handleDPA.ready());
    self.ready.set(handleOrganizaciones.ready());
    self.ready.set(handleCialcos.ready());
  });
});

Template.nuevaRed.events({
  'change #redCedulaRepresentante': function (event, template) {
    event.preventDefault();

    let cedula = event.currentTarget.value;
    if (cedula !== '') {
      Meteor.call('consultarPorCedula', cedula, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          $('#redNombreRepresentante').val(`${response.apellidos} ${response.nombres}`);
        }
      });
    }
  }
});
