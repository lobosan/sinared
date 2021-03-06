Template.registerHelper('appName', () => {
  return Meteor.settings.public.appName;
});

Template.registerHelper('isCurrentUser', (currentUser) => {
  return currentUser === Meteor.userId() ? true : false;
});

Template.registerHelper('disableIfAdmin', (userId) => {
  if (Meteor.userId() === userId) {
    return Roles.userIsInRole(userId, 'admin') ? 'disabled' : '';
  }
});

Template.registerHelper('selected', (v1, v2) => {
  return v1 === v2 ? true : false;
});

Template.registerHelper('humanDate', (timestamp) => {
  if (timestamp) {
    return moment(timestamp).format('YYYY-MM-DD');
  }
});

Template.registerHelper('datePickerDefaultOptions', () => {
  return {
    format: 'yyyy-mm-dd',
    endDate: '+0d',
    weekStart: 1,
    autoclose: true,
    startView: 'decade',
    todayHighlight: true,
    clearBtn: true,
    language: 'es'
  }
});

Template.registerHelper('timePickerOptions', () => {
  return {
    format: 'HH:mm',
    pickDate: false
  }
});
