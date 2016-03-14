Uploads = new FS.Collection("uploads", {
  stores: [new FS.Store.GridFS("uploads", {path: "~/uploads"})]
});

Uploads.allow({
  download: function (userId, fileObj) {
    return true;
  },
  fetch: []
});

/*if (Meteor.isServer) {
  FS.debug = true;
}*/
