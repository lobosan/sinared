Cialcos = new Meteor.Collection('cialcos');
SubsManagerCialcos = new SubsManager();

let mediosDifusionFrecuencia = [
  {label: 'Semanal', value: 'Semanal'},
  {label: 'Quincenal', value: 'Quincenal'},
  {label: 'Mensual', value: 'Mensual'},
  {label: 'De 3 a 6 veces al año', value: 'De 3 a 6 veces al año'},
  {label: 'De 1 a 2 veces al año', value: 'De 1 a 2 veces al año'}
];

Cialcos.attachSchema(new SimpleSchema({
  /*** DATOS GENERALES ***/
  fechaLevantamientoDatos: {
    type: String,
    label: 'Fecha de levantamiento de datos',
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datepicker'
      }
    }
  },
  anio: {
    optional: true,
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        let fechaLevantamientoDatos = this.field('fechaLevantamientoDatos').value;
        let fecha = fechaLevantamientoDatos.split('-');
        return Number(fecha[0]);
      } else if (this.isUpsert) {
        let fechaLevantamientoDatos = this.field('fechaLevantamientoDatos').value;
        let fecha = fechaLevantamientoDatos.split('-');
        return Number(fecha[0]);
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  cuatrimestre: {
    optional: true,
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        let fechaLevantamientoDatos = this.field('fechaLevantamientoDatos').value;
        if (fechaLevantamientoDatos) {
          let fecha = fechaLevantamientoDatos.split('-');
          let month = fecha[1];
          if (month >= 1 && month <= 4) return 1;
          if (month >= 5 && month <= 8) return 2;
          if (month >= 9 && month <= 12) return 3;
        }
      } else if (this.isUpsert) {
        let fechaLevantamientoDatos = this.field('fechaLevantamientoDatos').value;
        if (fechaLevantamientoDatos) {
          let fecha = fechaLevantamientoDatos.split('-');
          let month = fecha[1];
          if (month >= 1 && month <= 4) return 1;
          if (month >= 5 && month <= 8) return 2;
          if (month >= 9 && month <= 12) return 3;
        }
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  nombreLevantadorDatos: {
    type: String,
    label: 'Nombre de quien levanta los datos'
  },
  nombreCialco: {
    type: String,
    label: 'Nombre del CIALCO',
    index: true,
    unique: true
  },
  diasFuncionamiento: {
    type: String,
    label: 'Días de funcionamiento'
  },
  horaInicio: {
    type: String,
    label: 'Hora de inicio',
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  horaFin: {
    type: String,
    label: 'Hora de cierre',
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  /*** TIPO DE CIALCO ***/
  tipo: {
    type: String,
    autoform: {
      type: 'select-radio',
      label: false,
      options: function () {
        return [
          {label: 'Abastecimiento a catering', value: 'Abastecimiento a catering'},
          {label: 'Abastecimiento a MIPYMES', value: 'Abastecimiento a MIPYMES'},
          {label: 'Abastecimiento a restaurantes locales', value: 'Abastecimiento a restaurantes locales'},
          {label: 'Abastecimiento a tiendas de barrio', value: 'Abastecimiento a tiendas de barrio'},
          {label: 'Canasta de entrega dispersa', value: 'Canasta de entrega dispersa'},
          {label: 'Canasta de entrega en punto único', value: 'Canasta de entrega en punto único'},
          {label: 'Compra pública directa', value: 'Compra pública directa'},
          {label: 'Compra pública a través de la UNA-EP (Unidad Nacional de Almacenamiento - Empresa Pública)', value: 'Compra pública a través de la UNA-EP (Unidad Nacional de Almacenamiento - Empresa Pública)'},
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
  /*** UBICACIÓN ***/
  ubicacion: {
    type: UbicacionSchema
  },
  /*** DATOS DEL REPRESENTANTE ***/
  cedulaRepresentante: {
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
    label: 'Teléfono fijo',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    }
  },
  celularRepresentante: {
    optional: true,
    type: String,
    label: 'Teléfono celular',
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
  /*** FUNCIONAMIENTO DEL CIALCO ***/
  hombresCialco: {
    type: Number,
    label: 'Número de hombres que participan en el CIALCO',
    min: 0
  },
  mujeresCialco: {
    type: Number,
    label: 'Número de mujeres que participan en el CIALCO',
    min: 0
  },
  totalProductoresCialco: {
    optional: true,
    type: Number,
    autoValue: function () {
      return this.field('hombresCialco').value + this.field('mujeresCialco').value;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  reglamento: {
    type: String,
    label: 'Tiene reglamento',
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
  directiva: {
    type: String,
    label: 'Existe directiva',
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
  registroVentasProductor: {
    type: String,
    label: 'Tiene registro de ventas por productor',
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
  sistemaVeedurias: {
    type: String,
    label: 'Cuenta con algún sistema de veeduría (SPG, SIC, cualquier otro)',
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
  /*** PROPIEDAD DEL ESPACIO EN EL QUE FUNCIONA EL CIALCO ***/
  tipoPropiedad: {
    type: String,
    label: 'Tipo de propiedad o uso del espacio',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Arrendado', value: 'Arrendado'},
          {label: 'Comodato', value: 'Comodato'},
          {label: 'Comunal', value: 'Comunal'},
          {label: 'Prestado', value: 'Prestado'},
          {label: 'Propio', value: 'Propio'},
          {label: 'Provisto por el GAD', value: 'Provisto por el GAD'},
          {label: 'Público', value: 'Público'}
        ];
      }
    }
  },
  documentoPropiedad: {
    type: String,
    label: 'Documento de propiedad o uso del espacio',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Contrato', value: 'Contrato'},
          {label: 'Convenio', value: 'Convenio'},
          {label: 'Escritura', value: 'Escritura'},
          {label: 'Ninguno', value: 'Ninguno'}
        ];
      }
    }
  },
  /*** SERVICIOS CON LOS QUE CUENTA EL CIALCO ***/
  servicios: {
    optional: true,
    type: [String],
    autoform: {
      type: 'select-checkbox',
      label: false,
      options: function () {
        return [
          {label: 'Agua potable', value: 'Agua potable'},
          {label: 'Alcantarillado', value: 'Alcantarillado'},
          {label: 'Internet', value: 'Internet'},
          {label: 'Luz eléctrica', value: 'Luz eléctrica'},
          {label: 'Recolección de basura', value: 'Recolección de basura'},
          {label: 'Seguridad', value: 'Seguridad'},
          {label: 'Teléfono', value: 'Teléfono'}
        ];
      }
    }
  },
  /*** INFRAESTRUCTURA ***/
  infraestructura: {
    type: InfraestructuraSchema
  },
  /*** EQUIPAMIENTO CON EL QUE CUENTA ***/
  equipamiento: {
    type: EquipamientoSchema
  },
  /*** TIPOS DE PRODUCTOS QUE SE COMERCIALIZAN ***/
  tiposProductosComercializan: {
    optional: true,
    type: [String],
    autoform: {
      type: 'select-checkbox',
      label: false,
      options: function () {
        return [
          {label: 'Abastos', value: 'Abastos'},
          {label: 'Animales en pie', value: 'Animales en pie'},
          {label: 'Artesanías', value: 'Artesanías'},
          {label: 'Carne de animales faenados', value: 'Carne de animales faenados'},
          {label: 'Cereales', value: 'Cereales'},
          {label: 'Comidas y/o bebidas', value: 'Comidas y/o bebidas'},
          {label: 'Embutidos artesanales', value: 'Embutidos artesanales'},
          {label: 'Frutas de clima frío', value: 'Frutas de clima frío'},
          {label: 'Frutas tropicales', value: 'Frutas de clima cálido'},
          {label: 'Hortalizas', value: 'Hortalizas'},
          {label: 'Huevos', value: 'Huevos'},
          {label: 'Lácteos', value: 'Lácteos'},
          {label: 'Mariscos', value: 'Mariscos'},
          {label: 'Pescados', value: 'Pescados'},
          {label: 'Productos agrícolas con valor agregado', value: 'Productos agrícolas con valor agregado'},
          {label: 'Tubérculos', value: 'Tubérculos'},
          {label: 'Otros (insumos, plantas)', value: 'Otros (insumos, plantas)'}
        ];
      }
    }
  },
  /*estado: {
   type: String,
   label: 'Estado',
   autoform: {
   type: 'select-radio-inline',
   options: function () {
   return [
   {label: 'Nuevo', value: 'Nuevo'},
   {label: 'Fortalecido', value: 'Fortalecido'}
   ];
   }
   }
   },*/
  /*** MEDIOS TRADICIONALES DE DIFUSIÓN ***/
  volantesFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  afichesFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  perifoneoFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  periodicoFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  radioFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  televisionFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  /*** MEDIOS DIGITALES DE DIFUSIÓN ***/
  listaDistribucionFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  listaDistribucion: {
    optional: true,
    type: String,
    autoform: {
      label: false
    }
  },
  paginaWebFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  paginaWeb: {
    optional: true,
    type: String,
    regEx: /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/,
    autoform: {
      label: false
    }
  },
  facebookFrecuencia: {
    optional: true,
    type: String,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  facebook: {
    optional: true,
    type: String,
    autoform: {
      label: false
    }
  },
  twitterFrecuencia: {
    optional: true,
    type: String,
    regEx: /@([A-Za-z0-9_]+)/,
    autoform: {
      type: 'select',
      label: false,
      firstOption: 'Seleccione una frecuencia',
      options: function () {
        return mediosDifusionFrecuencia;
      }
    }
  },
  twitter: {
    optional: true,
    type: String,
    autoform: {
      label: false
    }
  },
  /*** ORGANIZACIONES DEL CIALCO ***/
  numeroOrganizacionesParticipan: {
    type: Number,
    label: 'Número de organizaciones participantes',
    min: 1
  },
  organizacionesCialco: {
    optional: true,
    type: [Object],
    label: 'Organizaciones',
    minCount: 1
  },
  'organizacionesCialco.$.nombre': {
    type: String,
    label: 'Nombre de la organización',
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
    }
  },
  'organizacionesCialco.$.representante': {
    optional: true,
    type: String,
    label: 'Nombre del representante',
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
    }
  },
  'organizacionesCialco.$.datoContacto': {
    optional: true,
    type: String,
    label: 'Dato de contacto',
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
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

TabularTables.Cialcos = new Tabular.Table({
  name: 'Lista de cialcos',
  collection: Cialcos,
  columns: [
    {data: 'periodo.0.anio', title: 'Año'},
    {data: 'periodo.0.cuatrimestre', title: 'Cuatrimestre'},
    {data: 'zonaNombre', title: 'Zona'},
    {data: 'provinciaNombre', title: 'Provincia'},
    {data: 'cantonNombre', title: 'Cantón'},
    {data: 'nombreCialco', title: 'CIALCO'},
    {data: 'tipo', title: 'Tipo'},
    {data: 'nombreRepresentante', title: 'Representante'},
    {data: 'responsable', title: 'Responsable'}
  ],
  sub: new SubsManager()
});
