Template.header.onCreated(function () {
  let self = this;
  self.opcionSeleccionada = new ReactiveVar();
  self.autorun(function () {
    let title = s.humanize(FlowRouter.getRouteName());
    title = title.replace('cialco', 'CIALCO');
    title = title.replace('Cialcos', 'CIALCOs');
    title = title.replace('gpr', 'GPR');
    title = title.replace('organizacion', 'organización');
    title = title.replace('Administracion', 'Administración');
    self.opcionSeleccionada.set(title);
  });
});

Template.header.helpers({
  brandLink: () => {
    let login = FlowRouter.path('login');
    let index = FlowRouter.path('administracion-de-usuarios');
    return !Meteor.loggingIn() && !Meteor.userId() ? login : index;
  },
  opcionSeleccionada: () => {
    return Template.instance().opcionSeleccionada.get();
  }
});

Template.header.events({
  'click .logout': () => {
    Meteor.logout((error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      }
    });
  }
});
