Organizaciones = new Meteor.Collection('organizaciones');
SubsManagerOrganizaciones = new SubsManager();

Organizaciones.attachSchema(new SimpleSchema({
  /*** DATOS GENERALES ***/
  nombreOrganizacion: {
    type: String,
    label: 'Nombre de la organización',
    index: true,
    unique: true
  },
  ruc: {
    type: Number,
    label: 'RUC de la organización',
    index: true,
    unique: true,
    regEx: /^[0-9]{13}$/,
    optional: true
  },
  acreditacionMagap: {
    optional: true,
    type: String,
    label: 'Número de acreditación MAGAP',
    index: true,
    unique: true
  },
  fechaAcreditacionMagap: {
    optional: true,
    type: String,
    label: 'Fecha de acreditación en el MAGAP',
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  registroSeps: {
    optional: true,
    type: String,
    label: 'Número de registro en la SEPS',
    index: true,
    unique: true
  },
  fechaRegistroSEPS: {
    optional: true,
    type: String,
    label: 'Fecha de registro en la SEPS',
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  direccion: {
    optional: true,
    type: String,
    label: 'Dirección de la organización',
    autoform: {
      rows: 2
    }
  },
  hombresOrganizacion: {
    type: Number,
    label: 'Número de hombres en la organización',
    min: 0
  },
  mujeresOrganizacion: {
    type: Number,
    label: 'Número de mujeres en la organización',
    min: 0
  },
  transportePropio: {
    type: String,
    label: 'Tiene transporte propio',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: 'Si', value: 'Si'},
          {label: 'No', value: 'No'}
        ];
      }
    }
  },
  actividadEconomica: {
    optional: true,
    type: String,
    label: 'Actividad económica'
  },
  cedulaRepresentante: {
    optional: true,
    type: String,
    label: 'Cédula del representante',
    regEx: /^[0-9]{10}$/,
    min: 10,
    max: 10
  },
  nombreRepresentante: {
    type: String,
    label: 'Nombre del representante'
  },
  telefonoFijoRepresentante: {
    optional: true,
    type: String,
    label: 'Teléfono fijo 1',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    }
  },
  telefonoFijo2: {
    optional: true,
    type: String,
    label: 'Teléfono fijo 2',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    }
  },
  celularRepresentante: {
    optional: true,
    type: String,
    label: 'Teléfono celular 1',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    }
  },
  celular2: {
    optional: true,
    type: String,
    label: 'Teléfono celular 2',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    }
  },
  emailRepresentante: {
    optional: true,
    type: String,
    label: 'Correo electrónico',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  paginaWeb: {
    optional: true,
    type: String,
    label: 'Página Web',
    regEx: /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/
  },
  facebook: {
    optional: true,
    type: String,
    label: 'Facebook'
  },
  twitter: {
    optional: true,
    type: String,
    label: 'Twitter',
    regEx: /@([A-Za-z0-9_]+)/,
    min: 6
  },
  fechaResponsable: {
    type: FechaResponsableSchema
  },
  /*** UBICACIÓN ***/
  ubicacion: {
    type: UbicacionSchema
  },
  /*productoresCialco: {
    optional: true,
    type: [Object],
    label: 'Productores de la organización vinculados a CIALCOs'
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
  },*/
  /*** TIPOS DE CIALCO EN LOS QUE PARTICIPA ***/
  cialcosParticipa: {
    type: [String],
    autoform: {
      type: 'select-checkbox',
      label: false,
      options: function () {
        return [
          {label: 'Abastecimiento a catering', value: 'Abastecimiento a catering'},
          {label: 'Abastecimiento a MIPYMES', value: 'Abastecimiento a MIPYMES'},
          {label: 'Abastecimiento a hoteles', value: 'Abastecimiento a hoteles'},
          {label: 'Abastecimiento a restaurantes locales', value: 'Abastecimiento a restaurantes locales'},
          {label: 'Abastecimiento a tiendas de barrio', value: 'Abastecimiento a tiendas de barrio'},
          {label: 'Canasta de entrega dispersa', value: 'Canasta de entrega dispersa'},
          {label: 'Canasta de entrega en punto único', value: 'Canasta de entrega en punto único'},
          {label: 'Compra pública directa', value: 'Compra pública directa'},
          {label: 'Compra pública a través de la UNA (Unidad Nacional de Almacenamiento)', value: 'Compra pública a través de la UNA (Unidad Nacional de Almacenamiento)'},
          {label: 'Compra pública a través del SERCOP (Servicio Nacional de Contratación Pública)', value: 'Compra pública a través del SERCOP (Servicio Nacional de Contratación Pública)'},
          {label: 'Espacio de venta en mercado', value: 'Espacio de venta en mercado'},
          {label: 'Exportación campesina', value: 'Exportación campesina'},
          {label: 'Feria de productores', value: 'Feria de productores'},
          {label: 'Tienda comunitaria o de productores', value: 'Tienda comunitaria o de productores'},
          {label: 'Turismo comunitario o agroturismo', value: 'Turismo comunitario o agroturismo'},
          {label: 'Venta directa en finca (pie de finca)', value: 'Venta directa en finca (pie de finca)'},
          {label: 'Otro', value: 'Otro'}
        ];
      }
    }
  },
  /*** OTROS CANALES DE COMERCIALIZACIÓN QUE EMPLEA ***/
  otrosCanalesComercializacion: {
    type: [String],
    autoform: {
      type: 'select-checkbox',
      label: false,
      options: function () {
        return [
          {label: 'Mercado municipal', value: 'Mercado municipal'},
          {label: 'Supermercados locales', value: 'Supermercados locales'},
          {label: 'Cadenas de supermercados', value: 'Cadenas de supermercados'},
          {label: 'Intermediarios', value: 'Intermediarios'},
          {label: 'Ferias libres', value: 'Ferias libres'},
          {label: 'Cadenas de restaurantes', value: 'Cadenas de restaurantes'},
          {label: 'Exportación', value: 'Exportación'},
          {label: 'Otro', value: 'Otro'}
        ];
      }
    }
  },
  observaciones: {
    optional: true,
    type: String,
    label: 'Observaciones',
    autoform: {
      rows: 4
    }
  },
  responsable: {
    optional: true,
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
    }
  },
  createdBy: {
    optional: true,
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
  }
}));

TabularTables.Organizaciones = new Tabular.Table({
  name: "Lista de organizaciones",
  collection: Organizaciones,
  responsive: true,
  autoWidth: false,
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
