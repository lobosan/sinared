UbicacionSchema = new SimpleSchema({
  zonaID: {
    optional: true,
    type: String,
    label: 'Zona',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una zona',
      options: function () {
        return DPA.find({grupo: 'Zona'}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  zonaNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoZona = this.field('ubicacion.zonaID').value;
        if (codigoZona)
          return DPA.findOne({codigo: codigoZona}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoZona}).descripcion};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  provinciaID: {
    optional: true,
    type: String,
    label: 'Provincia',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una provincia',
      options: function () {
        var codigoZona = AutoForm.getFieldValue('ubicacion.zonaID');
        var provincias = new RegExp('^' + codigoZona + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: provincias}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  provinciaNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoProvincia = this.field('ubicacion.provinciaID').value;
        if (codigoProvincia)
          return DPA.findOne({codigo: codigoProvincia}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoProvincia}).descripcion};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  cantonID: {
    optional: true,
    type: String,
    label: 'Cantón',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione un cantón',
      options: function () {
        var codigoProvincia = AutoForm.getFieldValue('ubicacion.provinciaID');
        var cantones = new RegExp('^' + codigoProvincia + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: cantones}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  cantonNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoCanton = this.field('ubicacion.cantonID').value;
        if (codigoCanton)
          return DPA.findOne({codigo: codigoCanton}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoCanton}).descripcion};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  parroquiaID: {
    optional: true,
    type: String,
    label: 'Parroquia',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una parroquia',
      options: function () {
        $("[name='zona']").change(function () {
          $("[name='parroquiaID'] option[value!='']").remove();
        });
        $("[name='provinciaID']").change(function () {
          $("[name='parroquiaID'] option[value!='']").remove();
        });
        var codigoCanton = AutoForm.getFieldValue('ubicacion.cantonID');
        var parroquias = new RegExp('^' + codigoCanton + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: parroquias}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  parroquiaNombre: {
    optional: true,
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoParroquia = this.field('ubicacion.parroquiaID').value;
        if (codigoParroquia)
          return DPA.findOne({codigo: codigoParroquia}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoParroquia}).descripcion};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  sectorComunidad: {
    optional: true,
    type: String,
    label: 'Sector o comunidad'
  },
  puntoReferencia: {
    optional: true,
    type: String,
    label: 'Punto de referencia'
  },
  callePrincipalCarretera: {
    optional: true,
    type: String,
    label: 'Calle principal o carretera '
  },
  numeroPredioLote: {
    optional: true,
    type: String,
    label: 'Número de predio, lote o Km'
  },
  calleSecundaria: {
    optional: true,
    type: String,
    label: 'Calle secundaria'
  }
});
