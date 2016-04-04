CialcoIntegrantes = new Meteor.Collection('cialco-integrantes');
SubsManagerCialcoIntegrantes = new SubsManager();

if (Meteor.isServer) {
  CialcoIntegrantes._ensureIndex({cialcoId: 1, productorCedula: 1}, {unique: 1});
}

CialcoIntegrantes.attachSchema(new SimpleSchema({
  cialcoId: {
    type: String,
    index: true,
    label: 'Nombre del CIALCO',
    autoform: {
      type: 'select2',
      options: function () {
        return Cialcos.find().map(function (cialco) {
          return {label: cialco.nombreCialco, value: cialco._id};
        });
      },
      select2Options: function () {
        return {
          placeholder: 'Busque un CIALCO por nombre',
          allowClear: true
        };
      }
    }
  },
  productorCedula: {
    type: String,
    index: true,
    label: 'Productor perteneciente al CIALCO',
    autoform: {
      type: 'select2',
      options: function () {
        return Productores.find().map(function (productor) {
          return {label: productor.cedula, value: productor.cedula};
        });
      },
      select2Options: function () {
        return {
          placeholder: 'Busque un productor por número de cédula',
          allowClear: true
        };
      }
    }
  },
  organizacionId: {
    optional: true,
    type: String,
    index: true,
    label: 'Organización con que el productor participa en el CIALCO',
    autoform: {
      type: 'select2',
      options: function () {
        return Organizaciones.find().map(function (organizacion) {
          return {label: organizacion.nombreOrganizacion, value: organizacion.nombreOrganizacion};
        });
      },
      select2Options: function () {
        return {
          placeholder: 'Busque una organización por nombre',
          allowClear: true
        };
      }
    }
  },
  representanteCialco: {
    type: String,
    label: 'El productor es representante del CIALCO',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: 'No',
      options: function () {
        return [
          {label: 'Si', value: 'Si'},
          {label: 'No', value: 'No'}
        ];
      }
    }
  },
  cialcoNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let cialcoId = this.field('cialcoId').value;
        if (cialcoId)
          return Cialcos.findOne({_id: cialcoId}).nombreCialco;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Cialcos.findOne({_id: cialcoId}).nombreCialco
        };
      } else {
        this.unset();
      }
    }
  },
  cialcoTipo: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let cialcoId = this.field('cialcoId').value;
        if (cialcoId)
          return Cialcos.findOne({_id: cialcoId}).tipo;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Cialcos.findOne({_id: cialcoId}).tipo
        };
      } else {
        this.unset();
      }
    }
  },
  cialcoProvincia: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let cialcoId = this.field('cialcoId').value;
        if (cialcoId)
          return Cialcos.findOne({_id: cialcoId}).ubicacion.provinciaNombre;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Cialcos.findOne({_id: cialcoId}).ubicacion.provinciaNombre
        };
      } else {
        this.unset();
      }
    }
  },
  productorNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let productorCedula = this.field('productorCedula').value;
        if (productorCedula)
          return `${Productores.findOne({cedula: productorCedula}).apellidos} ${Productores.findOne({cedula: productorCedula}).nombres}`;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: `${Productores.findOne({cedula: productorCedula}).apellidos} ${Productores.findOne({cedula: productorCedula}).nombres}`
        };
      } else {
        this.unset();
      }
    }
  },
  productorSexo: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let productorCedula = this.field('productorCedula').value;
        if (productorCedula)
          return Productores.findOne({cedula: productorCedula}).sexo;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Productores.findOne({cedula: productorCedula}).sexo
        };
      } else {
        this.unset();
      }
    }
  },
  organizacionNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let organizacionId = this.field('organizacionId').value;
        if (organizacionId)
          return Organizaciones.findOne({_id: organizacionId}).nombreOrganizacion;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Organizaciones.findOne({_id: organizacionId}).nombreOrganizacion
        };
      } else {
        this.unset();
      }
    }
  }
}));

TabularTables.CialcoIntegrantes = new Tabular.Table({
  name: 'Lista de integrantes de CIALCOs',
  collection: CialcoIntegrantes,
  pub: 'tabular_CialcoIntegrantes',
  responsive: true,
  autoWidth: false,
  columns: [
    {data: 'cialcoNombre', title: 'CIALCO'},
    {data: 'cialcoTipo', title: 'Tipo de CIALCO'},
    {data: 'cialcoProvincia', title: 'Provincia del CIALCO'},
    {data: 'productorCedula', title: 'Cédula del productor'},
    {data: 'productorNombre', title: 'Productor'},
    {data: 'productorSexo', title: 'Sexo'},
    {data: 'representanteCialco', title: 'Representante CIALCO'},
    {data: 'organizacionNombre', title: 'Organización'}
  ]
});