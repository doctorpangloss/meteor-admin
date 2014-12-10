ServerAdmin = {};

/**
 * Check if the userId is permitted to execute an admin command. Always returns true when the `insecure` package is installed. `this` is the method context.
 * @param userId {string} The user ID that is sending the command to evaluate
 * @returns {boolean} True if the user is permitted.
 */
ServerAdmin.allowed = function (userId) {
    return !!Package.insecure;
};

ServerAdmin._throwPermissionDeniedError = function() {
    throw new Meteor.Error(503, 'Permission denied.');
};

Meteor.methods({
    'doctorpangloss:admin/admin': function (expression) {
        if (!ServerAdmin.allowed.call(this, this.userId)) {
            ServerAdmin._throwPermissionDeniedError();
        }

        return eval(expression);
    }
});