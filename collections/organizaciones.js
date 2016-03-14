Organizaciones = new Meteor.Collection('organizaciones');
SubsManagerOrganizaciones = new SubsManager();

Organizaciones.attachSchema(new SimpleSchema({
  periodo: {
    type: [Object],
    label: 'Periodo'
  },
  'periodo.$.anio': {
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
  'periodo.$.cuatrimestre': {
    type: String,
    label: 'Cuatrimestre',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: '3',
      options: function () {
        return [
          {label: '1', value: '1'},
          {label: '2', value: '2'},
          {label: '3', value: '3'}
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
  cantonID: {
    type: String,
    label: 'Cantón',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione un cantón',
      options: function () {
        var codigoProvincia = AutoForm.getFieldValue('provinciaID');
        var cantones = new RegExp('^' + codigoProvincia + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: cantones}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  cantonNombre: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoCanton = this.field('cantonID').value;
        if (codigoCanton)
          return DPA.findOne({codigo: codigoCanton}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoCanton}).descripcion};
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
  parroquiaID: {
    type: String,
    label: 'Parroquia',
    optional: true,
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una parroquia',
      options: function () {
        $("[name='zona']").change(function() {
          $("[name='parroquiaID'] option[value!='']").remove();
        });
        $("[name='provinciaID']").change(function() {
          $("[name='parroquiaID'] option[value!='']").remove();
        });
        var codigoCanton = AutoForm.getFieldValue('cantonID');
        var parroquias = new RegExp('^' + codigoCanton + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: parroquias}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  parroquiaNombre: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoParroquia = this.field('parroquiaID').value;
        if (codigoParroquia)
          return DPA.findOne({codigo: codigoParroquia}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoParroquia}).descripcion};
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
  sectorComunidad: {
    type: String,
    label: 'Sector o comunidad',
    optional: true
  },
  ruc: {
    type: String,
    label: 'RUC de la organización',
    index: true,
    unique: true,
    regEx: /^[0-9]{13}$/,
    min: 13,
    max: 13,
    optional: true
  },
  nombreOrganizacion: {
    type: String,
    label: 'Nombre de la organización',
    index: true,
    unique: true
  },
  actividadEconomica: {
    type: String,
    label: 'Actividad económica',
    optional: true
  },
  cedulaRepresentante: {
    type: String,
    label: 'Cédula del representante',
    regEx: /^[0-9]{10}$/,
    min: 10,
    max: 10,
    optional: true
  },
  nombreRepresentante: {
    type: String,
    label: 'Nombre del representante'
  },
  direccion: {
    type: String,
    label: 'Dirección de la organización',
    optional: true,
    autoform: {
      rows: 2
    }
  },
  telefonoFijo1: {
    type: String,
    label: 'Teléfono fijo 1',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  telefonoFijo2: {
    type: String,
    label: 'Teléfono fijo 2',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  telefonoFijo3: {
    type: String,
    label: 'Teléfono fijo 3',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  celular1: {
    type: String,
    label: 'Teléfono celular 1',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    },
    optional: true
  },
  celular2: {
    type: String,
    label: 'Teléfono celular 2',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    },
    optional: true
  },
  email: {
    type: String,
    label: 'Correo electrónico',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    optional: true
  },
  paginaWeb: {
    type: String,
    label: 'Página Web',
    regEx: /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/,
    optional: true
  },
  facebook: {
    type: String,
    label: 'Facebook',
    optional: true
  },
  twitter: {
    type: String,
    label: 'Twitter',
    regEx: /@([A-Za-z0-9_]+)/,
    min: 6,
    optional: true
  },
  seps: {
    type: String,
    label: 'Fecha de registro en la SEPS',
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  acreditacionMagap: {
    type: String,
    label: 'Fecha de acreditación en el MAGAP',
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  hombresOrganizacion: {
    type: Number,
    label: 'Número de hombres en la organización',
    min: 0,
    optional: true
  },
  mujeresOrganizacion: {
    type: Number,
    label: 'Número de mujeres en la organización',
    min: 0,
    optional: true
  },
  totalProductoresOrganizacion: {
    type: Number,
    label: 'Total de productores en la organización',
    min: 0
  },
  productoresCialco: {
    type: [Object],
    label: 'Productores de la organización vinculados a CIALCOs',
    optional: true
  },
  'productoresCialco.$.cialcoID': {
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
        'formgroup-class': 'col-md-4'
      }
    }
  },
  'productoresCialco.$.cialcoNombre': {
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
  'productoresCialco.$.hombres': {
    type: Number,
    label: 'Número de hombres en el circuito',
    min: 0,
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
    }
  },
  'productoresCialco.$.mujeres': {
    type: Number,
    label: 'Número de mujeres en el circuito',
    min: 0,
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
    }
  },
  'productoresCialco.$.totalProductores': {
    type: Number,
    autoValue: function () {
      let hombres = (this.siblingField("hombres").value) ? this.siblingField("hombres").value : 0;
      let mujeres = (this.siblingField("mujeres").value) ? this.siblingField("mujeres").value : 0;
      return hombres + mujeres;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  observaciones: {
    type: String,
    label: 'Observaciones',
    optional: true,
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

TabularTables.Organizaciones = new Tabular.Table({
  name: "Lista de organizaciones",
  collection: Organizaciones,
  columns: [
    {data: "periodo.0.anio", title: "Año"},
    {data: "periodo.0.cuatrimestre", title: "Cuatrimestre"},
    {data: "zonaNombre", title: "Zona"},
    {data: "provinciaNombre", title: "Provincia"},
    {data: "cantonNombre", title: "Cantón"},
    {data: "nombreOrganizacion", title: "Organización"},
    {data: "nombreRepresentante", title: "Representante"},
    {data: "responsable", title: "Responsable"}
  ],
  sub: new SubsManager()
});
