Template.nuevoMontoVenta.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = SubsManagerDPA.subscribe('dpa');
    let handleCialcos = SubsManagerCialcos.subscribe('cialcos');
    self.ready.set(handleDPA.ready());
    self.ready.set(handleCialcos.ready());
  });
});
