Cialcos = new Meteor.Collection('cialcos');
SubsManagerCialcos = new SubsManager();

let itemEstado = [
  {label: 'Bueno', value: 'Bueno'},
  {label: 'Regular', value: 'Regular'},
  {label: 'Malo', value: 'Malo'}
];

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
    },
    optional: true
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
    },
    optional: true
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
  /*** UBICACIÓN ***/
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
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una parroquia',
      options: function () {
        $("[name='zona']").change(function () {
          $("[name='parroquiaID'] option[value!='']").remove();
        });
        $("[name='provinciaID']").change(function () {
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
  puntoReferencia: {
    type: String,
    label: 'Punto de referencia'
  },
  callePrincipalCarretera: {
    type: String,
    label: 'Calle principal o carretera ',
    optional: true
  },
  numeroPredioLote: {
    type: String,
    label: 'Número de predio, lote o Km',
    optional: true
  },
  calleSecundaria: {
    type: String,
    label: 'Calle secundaria',
    optional: true
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
    type: String,
    label: 'Teléfono fijo',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  celularRepresentante: {
    type: String,
    label: 'Teléfono celular',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    },
    optional: true
  },
  emailRepresentante: {
    type: String,
    label: 'Correo electrónico',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    optional: true
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
          {label: 'Propio', value: 'Propio'}
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
          {label: 'Escritura', value: 'Escritura'}
        ];
      }
    }
  },
  /*** SERVICIOS CON LOS QUE CUENTA EL CIALCO ***/
  servicios: {
    type: [String],
    optional: true,
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
  cubiertaCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  cubiertaEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  puestoCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  puestoEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  pisoCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  pisoEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  banioCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  banioEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  bodegaCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  bodegaEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  cuartoFrioCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  cuartoFrioEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  parqueaderoCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  parqueaderoEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  /*** EQUIPAMIENTO CON EL QUE CUENTA ***/
  carpasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  carpasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  mesasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  mesasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  estanteriasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  estanteriasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  sillasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  sillasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  balanzasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  balanzasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  frigorificoCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  frigorificoEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  parlantesCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  parlantesEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  microfonoCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  microfonoEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  cochesCargaCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  cochesCargaEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  hielerasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  hielerasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  gavetasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  gavetasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  tachosBasuraCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  tachosBasuraEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  pizarrasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  pizarrasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  rotulosCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  rotulosEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  escobasCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  escobasEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  palasBasuraCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  palasBasuraEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  trapeadoresCantidad: {
    type: Number,
    autoform: {
      label: false
    },
    optional: true,
    min: 1
  },
  trapeadoresEstado: {
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    },
    optional: true
  },
  /*** TIPOS DE PRODUCTOS QUE SE COMERCIALIZAN ***/
  tiposProductosComercializan: {
    type: String,
    autoform: {
      type: 'select-checkbox',
      label: false,
      options: function () {
        return [
          {label: 'Abastos', value: 'Abastos'},
          {label: 'Artesanías', value: 'Artesanías'},
          {label: 'Aves', value: 'Aves'},
          {label: 'Cárnicos (especies mayores)', value: 'Cárnicos (especies mayores)'},
          {label: 'Cárnicos (especies menores)', value: 'Cárnicos (especies menores)'},
          {label: 'Cereales', value: 'Cereales'},
          {label: 'Embutidos artesanales', value: 'Embutidos artesanales'},
          {label: 'Frutas de clima frío', value: 'Frutas de clima frío'},
          {label: 'Frutas tropicales', value: 'Frutas de clima cálido'},
          {label: 'Gastronomía', value: 'Gastronomía'},
          {label: 'Hortalizas', value: 'Hortalizas'},
          {label: 'Huevos', value: 'Huevos'},
          {label: 'Lácteos', value: 'Lácteos'},
          {label: 'Mariscos', value: 'Mariscos'},
          {label: 'Pescados', value: 'Pescados'},
          {label: 'Procesados', value: 'Procesados'},
          {label: 'Tubérculos', value: 'Tubérculos'},
          {label: 'Otros (insumos, plantas)', value: 'Otros (insumos, plantas)'}
        ];
      }
    },
    optional: true
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: String,
    optional: true,
    autoform: {
      label: false
    }
  },
  paginaWebFrecuencia: {
    type: String,
    optional: true,
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
    type: String,
    optional: true,
    autoform: {
      label: false
    }
  },
  facebookFrecuencia: {
    type: String,
    optional: true,
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
    type: String,
    optional: true,
    autoform: {
      label: false
    }
  },
  twitterFrecuencia: {
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
    type: [Object],
    label: 'Organizaciones',
    optional: true,
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
    type: String,
    optional: true,
    label: 'Nombre del representante',
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
    }
  },
  'organizacionesCialco.$.datoContacto': {
    type: String,
    optional: true,
    label: 'Dato de contacto',
    autoform: {
      afFormGroup: {
        'formgroup-class': 'col-md-4'
      }
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
