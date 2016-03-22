Meteor.publishComposite("tabular_CialcoIntegrantes", function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  this.unblock();

  return {
    find: function () {
      this.unblock();
      return CialcoIntegrantes.find({_id: {$in: ids}});
    },
    children: [
      {
        find: function (cialcoIntegrante) {
          this.unblock();
          return Cialcos.find(
            {
              _id: cialcoIntegrante.cialcoId
            }, {
              limit: 1,
              fields: {
                nombreCialco: 1,
                tipo: 1,
                montoEstimadoVentas: 1,
                ubicacion: 1
              },
              sort: {
                nombreCialco: 1
              }
            }
          );
        }
      },
      {
        find: function (cialcoIntegrante) {
          this.unblock();
          return Productores.find(
            {
              cedula: cialcoIntegrante.productorCedula
            }, {
              limit: 1,
              fields: {
                cedula: 1,
                apellidos: 1,
                nombres: 1,
                sexo: 1
              }
            }
          );
        }
      },
      {
        find: function (cialcoIntegrante) {
          this.unblock();
          return Organizaciones.find(
            {
              nombreOrganizacion: cialcoIntegrante.organizacionId
            }, {
              limit: 1,
              fields: {
                nombreOrganizacion: 1,
                totalProductoresOrganizacion: 1
              }
            }
          );
        }
      }
    ]
  };
});