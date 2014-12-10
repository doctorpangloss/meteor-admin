Package.describe({
    name: 'doctorpangloss:admin',
    summary: 'Interact with your server as a REPL live with administrative privileges',
    version: '1.0.0',
    git: 'https://github.com/doctorpangloss/meteor-admin.git'
});

Package.onUse(function (api) {
    // Allow us to detect 'insecure'.
    api.use('insecure', {weak: true});

    api.versionsFrom('0.6.5');
    api.addFiles('admin_server.js', 'server');
    api.addFiles('admin_client.js', 'client');
    api.export('ServerAdmin');
});
