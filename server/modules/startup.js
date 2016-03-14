let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _inicializarDPA();
  _security();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.generateAccounts();

var _inicializarDPA = () => Modules.server.inicializarDPA();

var _security = () => Modules.server.security();

Modules.server.startup = startup;
