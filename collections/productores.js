Productores = new Meteor.Collection('productores');
SubsManagerProductores = new SubsManager();

Productores.attachSchema(new SimpleSchema({
  /*** DATOS GENERALES ***/
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
    optional: true,
    type: String,
    label: 'Apellidos'
  },
  nombres: {
    optional: true,
    type: String,
    label: 'Nombres'
  },
  edad: {
    optional: true,
    type: Number,
    label: 'Edad',
    min: 1
  },
  sexo: {
    optional: true,
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
    optional: true,
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
  tipoProductor: {
    optional: true,
    type: [String],
    label: 'Tipo de productor',
    autoform: {
      type: 'select-checkbox',
      options: function () {
        return [
          {label: 'Agrícola', value: 'Agrícola'},
          {label: 'Artesano', value: 'Artesano'},
          {label: 'Cazador', value: 'Cazador'},
          {label: 'Elaborador de comidas y bebidas', value: 'Elaborador de comidas y bebidas'},
          {label: 'Pecuario', value: 'Pecuario'},
          {label: 'Pescador', value: 'Pescador'},
          {label: 'Procesador', value: 'Procesador'},
          {label: 'Recolector', value: 'Recolector'}
        ];
      }
    }
  },
  telefonoFijoContacto: {
    optional: true,
    type: String,
    label: 'Teléfono fijo',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    }
  },
  celularContacto: {
    optional: true,
    type: String,
    label: 'Teléfono celular',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    }
  },
  emailContacto: {
    optional: true,
    type: String,
    label: 'Correo electrónico',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  fechaResponsable: {
    optional: true,
    type: FechaResponsableSchema
  },
  /*** UBICACIÓN ***/
  ubicacion: {
    optional: true,
    type: UbicacionSchema
  },
  /*** DATOS DE LA FAMILIA ***/
  numeroPersonasFamilia: {
    optional: true,
    type: Number,
    label: 'Número de personas que conforman la familia',
    min: 2
  },
  numeroFamiliaresProduccion: {
    optional: true,
    type: Number,
    label: 'Número de personas de su núcleo familiar que apoyan en las actividades productivas',
    min: 2
  },
  numeroFamiliaresComercializacion: {
    optional: true,
    type: Number,
    label: 'Número de personas de su núcleo familiar que apoyan en la comercialización',
    min: 2
  },
  /*** SISTEMA PRODUCTIVO ***/
  propiedadTierra: {
    optional: true,
    type: String,
    label: 'La mayor cantidad de su tierra es',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Arrendada', value: 'Arrendada'},
          {label: 'Al partir', value: 'Al partir'},
          {label: 'Comunitaria', value: 'Comunitaria'},
          {label: 'En comodato', value: 'En comodato'},
          {label: 'Prestada', value: 'Prestada'},
          {label: 'Propia', value: 'Propia'}
        ];
      }
    }
  },
  necesidadesRiego: {
    optional: true,
    type: String,
    label: 'Sus necesidades de riego están satisfechas de manera',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Total', value: 'Total'},
          {label: 'Parcial', value: 'Parcial'},
          {label: 'Nula', value: 'Nula'}
        ];
      }
    }
  },
  numeroProductosCultiva: {
    optional: true,
    type: String,
    label: 'El número de productos que cultiva es',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Más de 12', value: 'Más de 12'},
          {label: 'De 6 hasta 12', value: 'De 6 hasta 12'},
          {label: 'De 2 a 5', value: 'De 2 a 5'},
          {label: 'Monocultivo', value: 'Monocultivo'}
        ];
      }
    }
  },
  usoAgroquimicos: {
    optional: true,
    type: String,
    label: 'El uso de agroquímicos en sus cultivos es',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Regular', value: 'Regular'},
          {label: 'Eventual', value: 'Eventual'},
          {label: 'Nulo', value: 'Nulo'}
        ];
      }
    }
  },
  parteDeSPG: {
    optional: true,
    type: String,
    label: 'Forma parte de un Sistema Participativo de Garantía (SPG)',
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: 'Si', value: 'Si'},
          {label: 'No', value: 'No'}
        ];
      }
    }
  },
  /*** DESTINO DE LOS INGRESOS OBTENIDOS EN EL CIALCO ***/
  destinoIngresos: {
    optional: true,
    type: [String],
    autoform: {
      type: 'select-checkbox',
      label: false,
      options: function () {
        return [
          {label: 'Alimentación', value: 'Alimentación'},
          {label: 'Arriendo de tierra', value: 'Arriendo de tierra'},
          {label: 'Educación', value: 'Educación'},
          {label: 'Pago de deudas', value: 'Pago de deudas'},
          {label: 'Producción', value: 'Producción'},
          {label: 'Recreación', value: 'Recreación'},
          {label: 'Salud', value: 'Salud'},
          {label: 'Vestimenta', value: 'Vestimenta'},
          {label: 'Vivienda', value: 'Vivienda'},
          {label: 'Otros', value: 'Otros'}
        ];
      }
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

TabularTables.Productores = new Tabular.Table({
  name: 'Lista de productores',
  collection: Productores,
  responsive: true,
  autoWidth: false,
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
