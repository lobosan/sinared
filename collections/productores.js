Productores = new Meteor.Collection('productores');

Productores.attachSchema(new SimpleSchema({
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
  cuatrimestre: {
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
    optional: true,
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
  cedula: {
    type: String,
    label: 'Cédula',
    index: true,
    unique: true,
    regEx: /^[0-9]{10}$/,
    min: 10,
    max: 10
  },
  apellidos: {
    type: String,
    label: 'Apellidos'
  },
  nombres: {
    type: String,
    label: 'Nombres'
  },
  edad: {
    type: Number,
    label: 'Edad',
    min: 1
  },
  sexo: {
    type: String,
    label: 'Sexo',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: 'MASCULINO', value: 'MASCULINO'},
          {label: 'FEMENINO', value: 'FEMENINO'}
        ];
      }
    }
  },
  estadoCivil: {
    type: String,
    label: 'Estado civil',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: 'SOLTERO', value: 'SOLTERO'},
          {label: 'CASADO', value: 'CASADO'},
          {label: 'VIUDO', value: 'VIUDO'},
          {label: 'DIVORCIADO', value: 'DIVORCIADO'},
          {label: 'UNIÓN DE HECHO', value: 'UNIÓN DE HECHO'}
        ];
      }
    }
  },
  telefonoFijoContacto: {
    type: String,
    label: 'Teléfono fijo',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  celularContacto: {
    type: String,
    label: 'Teléfono celular',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    },
    optional: true
  },
  emailContacto: {
    type: String,
    label: 'Correo electrónico',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    optional: true
  },
  organizaciones: {
    type: [String],
    label: 'Organizaciones a las que pertenece',
    optional: true,
    autoform: {
      type: 'select2',
      options: function () {
        return Organizaciones.find().map(function (organizacion) {
          return {label: organizacion.nombreOrganizacion, value: organizacion._id};
        });
      },
      select2Options: function () {
        return {
          placeholder: 'Seleccione una o varias',
          allowClear: true
        };
      },
      afFieldInput: {
        multiple: true
      }
    }
  },
  cialcos: {
    type: [String],
    label: 'CIALCOs en los que participa',
    autoform: {
      type: 'select2',
      options: function () {
        return Cialcos.find().map(function (cialco) {
          return {label: cialco.nombreCialco, value: cialco._id};
        });
      },
      select2Options: function () {
        return {
          placeholder: 'Seleccione uno o varios',
          allowClear: true
        };
      },
      afFieldInput: {
        multiple: true
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

TabularTables.Productores = new Tabular.Table({
  name: 'Lista de productores',
  collection: Productores,
  columns: [
    {data: 'anio', title: 'Año'},
    {data: 'cuatrimestre', title: 'Cuatrimestre'},
    {data: 'zonaNombre', title: 'Zona'},
    {data: 'provinciaNombre', title: 'Provincia'},
    {data: 'cedula', title: 'Cédula'},
    {data: 'apellidos', title: 'Apellidos'},
    {data: 'nombres', title: 'Nombres'},
    {data: 'responsable', title: 'Responsable'}
  ],
  sub: new SubsManager()
});
