let itemEstado = [
  {label: 'Bueno', value: 'Bueno'},
  {label: 'Regular', value: 'Regular'},
  {label: 'Malo', value: 'Malo'}
];

InfraestructuraSchema = new SimpleSchema({
  cubiertaCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  cubiertaEstado: {
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
  puestoCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  puestoEstado: {
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
  casetaCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  casetaEstado: {
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
  oficinaCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  oficinaEstado: {
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
  banioCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  banioEstado: {
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
  bodegaCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  bodegaEstado: {
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
  cuartoFrioCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  cuartoFrioEstado: {
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
  parqueaderoCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  parqueaderoEstado: {
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
  lavaderoCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  lavaderoEstado: {
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
  centroAcopioCantidad: {
    optional: true,
    type: Number,
    autoform: {
      label: false
    },
    min: 1
  },
  centroAcopioEstado: {
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
