Template.ErrorPage.onCreated(function() {
  Session.setDefault('error-text', '');
});

Template.ErrorPage.helpers({
  errorText: function() {
    return Session.get('error-text');
  }
});
