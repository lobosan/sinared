let hooksObject = {
  onSuccess: function (formType, result) {
    Bert.alert('Información guardada exitosamente', 'success');
  },
  onError: function (formType, error) {
    Bert.alert('No se guardó la información, revise sus datos', 'warning');
  }
};

AutoForm.addHooks([
  'insertCialcoForm',
  'insertOrganizacionForm',
  'insertRedForm',
  'insertProductorForm',
  'insertMontoVentaForm',
  'insertMetasForm',
  'insertRespaldoForm'
], hooksObject);

AutoForm.hooks({
  insertOrganizacionForm: {
    before: {
      insert: function (doc) {
        if (doc.telefonoFijo1 === undefined && doc.celular1 === undefined && doc.email=== undefined) {
          Bert.alert('Al menos un dato de contacto es requerido', 'warning');
          return false;
        } else {
          return doc;
        }
      }
    }
  }
});

AutoForm.addHooks(['insertCialcoForm', 'insertRedForm'], {
  before: {
    insert: function (doc) {
      if (doc.telefonoFijoRepresentante === undefined && doc.celularRepresentante === undefined && doc.emailRepresentante=== undefined) {
        Bert.alert('Al menos un dato de contacto es requerido', 'warning');
        return false;
      } else {
        return doc;
      }
    }
  }
});
