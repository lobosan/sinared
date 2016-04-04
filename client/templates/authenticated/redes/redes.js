Template.redes.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function () {
    let handleCialcos = SubsManagerCialcos.subscribe('cialcos');
    let handleProductores = SubsManagerProductores.subscribe('productores');
    let handleOrganizaciones = SubsManagerOrganizaciones.subscribe('organizaciones');
    let handleCialcoIntegrantes = Meteor.subscribe('cialco-integrantes');
    self.ready.set(handleCialcos.ready());
    self.ready.set(handleProductores.ready());
    self.ready.set(handleOrganizaciones.ready());
    self.ready.set(handleCialcoIntegrantes.ready());
  });
});