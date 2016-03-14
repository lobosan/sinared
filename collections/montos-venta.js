MontosVenta = new Meteor.Collection('montos-venta');

MontosVenta.attachSchema(new SimpleSchema({
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
  semestre: {
    type: String,
    label: 'Semestre',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: '2',
      options: function () {
        return [
          {label: '1', value: '1'},
          {label: '2', value: '2'}
        ];
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
  cialcos: {
    type: [Object],
    label: 'CIALCOs',
    minCount: 1,
    optional: true
  },
  'cialcos.$.cialcoID': {
    type: String,
    label: 'Nombre del circuito',
    autoform: {
      type: 'select2',
      options: function () {
        return Cialcos.find().map(function (cialco) {
          return {label: cialco.nombreCialco, value: cialco._id};
        });
      },
      select2Options: function () {
        return {placeholder: 'Busque y seleccione un CIALCO'};
      },
      afFormGroup: {
        'formgroup-class': 'col-md-8'
      }
    }
  },
  'cialcos.$.cialcoNombre': {
    type: String,
    autoValue: function () {
      let cialcoID = this.siblingField("cialcoID").value;
      if (cialcoID)
        return Cialcos.findOne({_id: cialcoID}).nombreCialco;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  'cialcos.$.cialcoModalidad': {
    type: String,
    optional: true,
    autoValue: function () {
      let cialcoID = this.siblingField("cialcoID").value;
      if (cialcoID)
        return Cialcos.findOne({_id: cialcoID}).modalidad;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  'cialcos.$.ventasSemestre': {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Total de ventas del circuito por semestre ($)',
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
    }
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

TabularTables.MontosVenta = new Tabular.Table({
  name: "Lista de montos de venta",
  collection: MontosVenta,
  columns: [
    {data: "anio", title: "Año"},
    {data: "semestre", title: "Semestre"},
    {data: "zonaNombre", title: "Zona"},
    {data: "provinciaNombre", title: "Provincia"},
    {data: "cialcos.0.cialcoNombre", title: "CIALCO"},
    {data: "cialcos.0.cialcoModalidad", title: "Modalidad"},
    {data: "cialcos.0.ventasSemestre", title: "Venta semestral ($)"}
  ],
  sub: new SubsManager()
});
