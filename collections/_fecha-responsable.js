FechaResponsableSchema = new SimpleSchema({
  fechaLevantamientoDatos: {
    type: String,
    label: 'Fecha de levantamiento de datos',
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datepicker'
      }
    }
  },
  anio: {
    optional: true,
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        let fechaLevantamientoDatos = this.field('fechaResponsable.fechaLevantamientoDatos').value;
        let fecha = fechaLevantamientoDatos.split('-');
        return Number(fecha[0]);
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  cuatrimestre: {
    optional: true,
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        let fechaLevantamientoDatos = this.field('fechaResponsable.fechaLevantamientoDatos').value;
        if (fechaLevantamientoDatos) {
          let fecha = fechaLevantamientoDatos.split('-');
          let month = fecha[1];
          if (month >= 1 && month <= 4) return 1;
          if (month >= 5 && month <= 8) return 2;
          if (month >= 9 && month <= 12) return 3;
        }
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  nombreLevantadorDatos: {
    type: String,
    label: 'Nombre de quien levanta los datos'
  }
});
