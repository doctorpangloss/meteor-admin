Package.describe({
  name: 'doctorpangloss:admin',
  summary: 'Interact with your server as a REPL live with administrative privileges',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('doctorpangloss:admin.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('doctorpangloss:admin');
  api.addFiles('doctorpangloss:admin-tests.js');
});
