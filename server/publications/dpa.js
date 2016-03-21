Meteor.publish('dpa', function () {
  return DPA.find({}, {sort: {descripcion: 1}}, {reactive: false});
});

Meteor.publish('provincias', function () {
  return DPA.find({grupo: 'Provincia'}, {sort: {descripcion: 1}}, {reactive: false});
});
