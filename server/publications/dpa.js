Meteor.publish('dpa', function () {
    return DPA.find({}, {reactive: false});
});

Meteor.publish('provincias', function () {
    return DPA.find({grupo: 'Provincia'});
});
