Template.nuevaOrganizacion.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = SubsManagerDPA.subscribe('dpa');
    let handleCialcos = SubsManagerCialcos.subscribe('cialcos');
    self.ready.set(handleDPA.ready());
    self.ready.set(handleCialcos.ready());
  });
});

Template.nuevaOrganizacion.events({
  'change [name="ruc"]': function (event, template) {
    event.preventDefault();

    let ruc = event.currentTarget.value;
    if (ruc !== '') {
      Meteor.call('consultarPorRUC', ruc, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          if (response.error) {
            Bert.alert(response.error, "warning");
            $('input[name="ruc"]').val('');
            $('input[name="nombreOrganizacion"]').val('');
            $('input[name="actividadEconomica"]').val('');
            $('#orgCedulaRepresentante').val('');
            $('#orgNombreRepresentante').val('');
            $('textarea[name="direccion"]').val('');
            $('input[name="telefonoFijo1"]').val('');
            $('input[name="telefonoFijo2"]').val('');
            $('input[name="telefonoFijo3"]').val('');
          } else {
            $('input[name="nombreOrganizacion"]').val(response.nombreOrganizacion);
            $('input[name="actividadEconomica"]').val(response.actividadEconomica);
            $('#orgCedulaRepresentante').val(response.cedulaRepresentante);
            $('#orgNombreRepresentante').val(response.nombreRepresentante);
            $('textarea[name="direccion"]').val(response.direccion);
            $('input[name="telefonoFijo1"]').val(response.telefonoFijo1);
            $('input[name="telefonoFijo2"]').val(response.telefonoFijo2);
            $('input[name="telefonoFijo3"]').val(response.telefonoFijo3);
          }
        }
      });
    }
  }
});

