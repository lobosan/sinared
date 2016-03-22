CialcoIntegrantes = new Meteor.Collection('cialco-integrantes');
SubsManagerCialcoIntegrantes = new SubsManager();

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
    optional: true,
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
  }
}));

TabularTables.CialcoIntegrantes = new Tabular.Table({
  name: 'Lista de integrantes de CIALCOs',
  collection: CialcoIntegrantes,
  pub: 'tabular_CialcoIntegrantes',
  columns: [
    {data: 'cialcoId', title: 'CIALCO ID'},
    {data: 'nombreCialco()', title: 'CIALCO'},
    {data: 'tipoCialco()', title: 'Tipo de CIALCO'},
    {data: 'provinciaCialco()', title: 'Provincia del CIALCO'},
    {data: 'productorCedula', title: 'Cédula del productor'},
    {data: 'nombreProductor()', title: 'Productor'},
    {data: 'sexoProductor()', title: 'Sexo'},
    {data: 'representanteCialco', title: 'Representante CIALCO'},
    {data: 'organizacionId', title: 'Organización'}
  ],
  columnDefs: [
    {targets: [0], visible: false, searchable: false},
    {targets: [1], visible: true, searchable: true, sortable: true},
    {targets: [2], visible: true, searchable: true, sortable: true},
    {targets: [3], visible: true, searchable: true, sortable: true},
    {targets: [4], visible: false, searchable: false},
    {targets: [5], visible: true, searchable: true, sortable: true},
    {targets: [6], visible: true, searchable: true, sortable: true},
    {targets: [7], visible: true, searchable: true, sortable: true}/*,
    {targets: [8], visible: true, searchable: true, sortable: true}*/
  ]
});