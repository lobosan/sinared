Meteor.publish('cialcos', function () {
  return Cialcos.find({}, {fields: {nombreCialco: 1, ubicacion: 1}});
});

Meteor.publish('reporteCialcos', function () {
  return Cialcos.find({}, {fields: {nombreCialco: 1, modalidad: 1}});
});
