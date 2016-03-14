Template.metas.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.anio = new ReactiveVar();
  self.provinciaID = new ReactiveVar();

  self.autorun(function() {
    let handleProvincias = SubsManagerDPA.subscribe('provincias');
    self.ready.set(handleProvincias.ready());
    let anio = self.anio.get();
    let provinciaID = self.provinciaID.get();
    if (anio && provinciaID) {
      let handleMetas = SubsManagerMetas.subscribe('metas', anio, provinciaID);
      self.ready.set(handleMetas.ready());
    }
  });
});

Template.metas.helpers({
  anios: () => {
    return _.map(_.range(2011, new Date().getFullYear() + 1), function (value) {
      return {value: value};
    });
  },
  provincias: () => {
    return DPA.find({grupo: 'Provincia'}).map(function (dpa) {
      return {label: dpa.descripcion, value: dpa.codigo};
    });
  },
  metasAnualesPorProvincia: () => {
    let metas = Metas.findOne();

    if (metas) {
      return metas;
    }
  }
});

Template.metas.events({
  'change [name="anioMetas"]': function (event, template) {
    let anio = $(event.target).find('option:selected').val();
    template.anio.set(anio);
  },
  'change [name="provinciaMetas"]': function (event, template) {
    let provinciaID = $(event.target).find('option:selected').val();
    template.provinciaID.set(provinciaID);
  }
});
