Respaldos = new Meteor.Collection('respaldos');

Respaldos.attachSchema(new SimpleSchema({
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
  periodo: {
    type: String,
    label: 'Período',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: 'Tercer cuatrimestre',
      options: function () {
        return [
          {label: 'Primer cuatrimestre', value: 'Primer cuatrimestre'},
          {label: 'Segundo cuatrimestre', value: 'Segundo cuatrimestre'},
          {label: 'Tercer cuatrimestre', value: 'Tercer cuatrimestre'},
          {label: 'Primer semestre', value: 'Primer semestre'},
          {label: 'Segundo semestre', value: 'Segundo semestre'}
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
  respaldos: {
    type: [Object],
    label: 'Respaldos',
    minCount: 1
  },
  'respaldos.$.archivo': {
    type: String,
    label: 'Archivo',
    autoform: {
      placeholder: 'Haga clic para subir un archivo o arrástrelo hasta aquí',
      afFieldInput: {
        type: "cfs-file",
        collection: "uploads"
      }
    }
  },
  'respaldos.$.descripcion': {
    type: String,
    label: 'Descripción (explique el contenido del respaldo)',
    autoform: {
      rows: 4
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

TabularTables.Respaldos = new Tabular.Table({
  name: "Lista de respaldos",
  collection: Respaldos,
  columns: [
    {data: "zonaNombre", title: "Zona"},
    {data: "provinciaNombre", title: "Provincia"},
    {data: "anio", title: "Año"},
    {data: "periodo", title: "Período"},
    {data: "respaldos.0.archivo", title: "Respaldo", render: function (val, type, doc) {
      if (val) {
        let upload  = Uploads.findOne({_id: val}).copies.uploads;
        return `<a target="_blank" href="/cfs/files/uploads/${val}/${upload.name}">${upload.name}</a>`;
      }
    }},
    {data: "respaldos.0.descripcion", title: "Descripción"}
  ],
  sub: new SubsManager()
});
