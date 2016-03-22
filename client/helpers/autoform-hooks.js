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
  'insertRespaldoForm',
  'insertCialcoIntegrantesForm'
], hooksObject);

AutoForm.addHooks(['insertOrganizacionForm', 'insertRedForm'], {
  before: {
    insert: function (doc) {
      if (doc.telefonoFijoRepresentante === undefined && doc.celularRepresentante === undefined && doc.emailRepresentante === undefined) {
        Bert.alert('Ingrese al menos un dato de contacto para el representante', 'warning');
        return false;
      } else {
        return doc;
      }
    }
  }
});

AutoForm.addHooks(['insertCialcoForm'], {
  before: {
    insert: function (doc) {
      if (doc.horaInicio !== undefined && doc.horaFin !== undefined) {
        doc.horaInicio = moment(doc.horaInicio).format('HH:mm');
        doc.horaFin = moment(doc.horaFin).format('HH:mm');
        return doc;
      } else {
        return doc
      }
    }
  }
});
