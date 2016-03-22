Meteor.publish('productores', function () {
  return Productores.find({}, {fields: {cedula: 1}});
});