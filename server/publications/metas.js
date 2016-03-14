Meteor.publish('metas', function (anio, provinciaID) {
  check(anio, String);
  check(provinciaID, String);
  return Metas.find({anio: anio, provinciaID: provinciaID});
});
