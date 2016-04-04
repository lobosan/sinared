let startup = function () {
  TAPi18n.setLanguage('es');
  $.fn.select2.defaults.set('debug', true);
  $.fn.select2.defaults.set('language', 'es');
  SimpleSchema.debug = true;
  AutoForm.setDefaultTemplateForType('afArrayField', 'customArrayOfObjects');
  AutoForm.debug();
  Bert.defaults = {
    hideDelay: 5000,
    style: 'growl-top-right'
  };
};

Modules.client.startup = startup;
