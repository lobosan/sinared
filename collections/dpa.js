DPA = new Mongo.Collection('dpa');
SubsManagerDPA = new SubsManager();

DPA.attachSchema(new SimpleSchema({
  codigo: {
    type: String,
    index: true,
    unique: true
  },
  grupo: {
    type: String
  },
  descripcion: {
    type: String
  }
}));