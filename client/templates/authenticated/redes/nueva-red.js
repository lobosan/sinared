Template.nuevaRed.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleCialcos = SubsManagerCialcos.subscribe('cialcos');
    let handleProductores = SubsManagerProductores.subscribe('productores');
    let handleOrganizaciones = SubsManagerOrganizaciones.subscribe('organizaciones');
    self.ready.set(handleCialcos.ready());
    self.ready.set(handleProductores.ready());
    self.ready.set(handleOrganizaciones.ready());
  });
});
