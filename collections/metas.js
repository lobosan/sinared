Metas = new Meteor.Collection('metas');
SubsManagerMetas = new SubsManager();

Metas.attachSchema(new SimpleSchema({
  anio: {
    type: String,
    label: 'Año',
    autoform: {
      type: 'select',
      defaultValue: 2015,
      firstOption: 'Seleccione un año',
      options: function () {
        return _.map(_.range(2011, new Date().getFullYear() + 1), function (value) {
          return {label: value, value: value};
        });
      }
    }
  },
  zonaID: {
    type: String,
    label: 'Zona',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una zona',
      options: function () {
        return DPA.find({grupo: 'Zona'}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  zonaNombre: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoZona = this.field('zonaID').value;
        if (codigoZona)
          return DPA.findOne({codigo: codigoZona}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoZona}).descripcion};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true
  },
  provinciaID: {
    type: String,
    label: 'Provincia',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una provincia',
      options: function () {
        var codigoZona = AutoForm.getFieldValue('zonaID');
        var provincias = new RegExp('^' + codigoZona + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: provincias}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  provinciaNombre: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoProvincia = this.field('provinciaID').value;
        if (codigoProvincia)
          return DPA.findOne({codigo: codigoProvincia}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoProvincia}).descripcion};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true
  },
  cialcoPrimerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  cialcoSegundoCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  cialcoTercerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  organizacionesPrimerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  organizacionesSegundoCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  organizacionesTercerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  redesPrimerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  redesSegundoCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  redesTercerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  productoresPrimerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  productoresSegundoCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  productoresTercerCuatrimestre: {
    type: Number,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  montoVentasPrimerSemestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Primer semestre ($)'
  },
  montoVentasSegundoSemestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Segundo semestre ($)'
  },
  createdAt: {
    type: String,
    autoValue: function () {
      var currentDate = new Date();
      var date = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
      if (this.isInsert) {
        return date;
      } else if (this.isUpsert) {
        return {$setOnInsert: date};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  createdBy: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.userId()};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true
  },
  responsable: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.users.findOne({_id: Meteor.userId()}).profile.name;
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.users.findOne({_id: Meteor.userId()}).profile.name};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true
  }
}));
