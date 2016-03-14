Meteor.publish('organizaciones', function () {
  return Organizaciones.find({}, {fields: {nombreOrganizacion: 1}});
});
