let itemEstado = [
  {label: 'Bueno', value: 'Bueno'},
  {label: 'Regular', value: 'Regular'},
  {label: 'Malo', value: 'Malo'}
];

EquipamientoSchema = new SimpleSchema({
  carpasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  carpasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  mesasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  mesasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  estanteriasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  estanteriasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  sillasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  sillasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  balanzasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  balanzasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  frigorificoCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  frigorificoEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  parlantesCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  parlantesEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  microfonoCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  microfonoEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  cochesCargaCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  cochesCargaEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  hielerasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  hielerasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  gavetasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  gavetasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  tachosBasuraCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  tachosBasuraEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  pizarrasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  pizarrasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  rotulosCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  rotulosEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  escobasCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  escobasEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  palasBasuraCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  palasBasuraEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  },
  trapeadoresCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  trapeadoresEstado: {
    optional: true,
    type: String,
    autoform: {
      type: 'select-radio-inline',
      label: false,
      options: function () {
        return itemEstado;
      }
    }
  }
});