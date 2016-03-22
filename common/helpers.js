CialcoIntegrantes.helpers({
  nombreCialco: function () {
    return Cialcos.findOne({_id: this.cialcoId}).nombreCialco;
  },
  tipoCialco: function () {
    return Cialcos.findOne({_id: this.cialcoId}).tipo;
  },
  provinciaCialco: function () {
    return Cialcos.findOne({_id: this.cialcoId}).ubicacion.provinciaNombre;
  },
  nombreProductor: function () {
    return `${Productores.findOne({cedula: this.productorCedula}).apellidos} ${Productores.findOne({cedula: this.productorCedula}).nombres}`;
  },
  sexoProductor: function () {
    return Productores.findOne({cedula: this.productorCedula}).sexo;
  }
});