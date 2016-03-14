Template.default.events({
  'show.bs.collapse .side-menu .nav .dropdown': function () {
    return $(".side-menu .nav .dropdown .collapse").collapse('hide');
  },
  'click .navbar-expand-toggle': function (event, template) {
    event.preventDefault();
    $(".app-container").toggleClass("expanded");
    return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
  },
  'click .navbar-right-expand-toggle': function (event, template) {
    event.preventDefault();
    $(".navbar-right").toggleClass("expanded");
    return $(".navbar-right-expand-toggle").toggleClass("fa-rotate-90");
  }
});
