let startup = function () {
  TAPi18n.setLanguage('es');
  $.fn.select2.defaults.set('debug', true);
  //$.fn.select2.defaults.set('theme', 'bootstrap');
  $.fn.select2.defaults.set('language', 'es');
  $.fn.select2.defaults.set('minimumInputLength', '3');
  SimpleSchema.debug = true;
  AutoForm.setDefaultTemplateForType('afArrayField', 'customArrayOfObjects');
  AutoForm.debug();
  Bert.defaults.style = 'growl-top-right';
};

Modules.client.startup = startup;
