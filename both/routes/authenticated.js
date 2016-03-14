const authenticatedRedirect = () => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.go('login');
  }
};

const blockUnauthorizedAdmin = (context, redirect) => {
  if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
    Modules.both.redirectUser({redirect: redirect});
  }
};

const blockUnauthorizedManager = (context, redirect) => {
  if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), ['admin', 'manager'])) {
    Modules.both.redirectUser({redirect: redirect});
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [authenticatedRedirect]
});

// Reportes
authenticatedRoutes.route('/reporte-de-cialcos', {
  name: 'reporte-de-cialcos',
  action() {
    BlazeLayout.render('default', {yield: 'reporteCialcos'});
  }
});

// CIALCOs
authenticatedRoutes.route('/cialcos', {
  name: 'cialcos',
  action() {
    BlazeLayout.render('default', {yield: 'cialcos'});
  }
});

authenticatedRoutes.route('/nuevo-cialco', {
  name: 'nuevo-cialco',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoCialco'});
  }
});

// Organizaciones
authenticatedRoutes.route('/organizaciones', {
  name: 'organizaciones',
  action() {
    BlazeLayout.render('default', {yield: 'organizaciones'});
  }
});

authenticatedRoutes.route('/nueva-organizacion', {
  name: 'nueva-organizacion',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevaOrganizacion'});
  }
});

// Redes
authenticatedRoutes.route('/redes', {
  name: 'redes',
  action() {
    BlazeLayout.render('default', {yield: 'redes'});
  }
});

authenticatedRoutes.route('/nueva-red', {
  name: 'nueva-red',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevaRed'});
  }
});

// Productores
authenticatedRoutes.route('/productores', {
  name: 'productores',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'productores'});
  }
});

authenticatedRoutes.route('/nuevo-productor', {
  name: 'nuevo-productor',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoProductor'});
  }
});

// Montos de venta
authenticatedRoutes.route('/montos-de-venta', {
  name: 'montos-de-venta',
  action() {
    BlazeLayout.render('default', {yield: 'montosVenta'});
  }
});

authenticatedRoutes.route('/nuevo-monto-venta', {
  name: 'nuevo-monto-venta',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoMontoVenta'});
  }
});

// Respaldos
authenticatedRoutes.route('/respaldos-gpr', {
  name: 'respaldos-gpr',
  action() {
    BlazeLayout.render('default', {yield: 'respaldos'});
  }
});

authenticatedRoutes.route('/nuevo-respaldo-gpr', {
  name: 'nuevo-respaldo-gpr',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoRespaldo'});
  }
});

// Metas
authenticatedRoutes.route('/metas-gpr', {
  name: 'metas-gpr',
  action() {
    BlazeLayout.render('default', {yield: 'metas'});
  }
});

authenticatedRoutes.route('/nuevas-metas-gpr', {
  name: 'nuevas-metas-gpr',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevasMetas'});
  }
});

// Usuarios
authenticatedRoutes.route('/administracion-de-usuarios', {
  name: 'administracion-de-usuarios',
  triggersEnter: [blockUnauthorizedAdmin],
  action() {
    BlazeLayout.render('default', {yield: 'users'});
  }
});
