ServerAdmin = ServerAdmin || {};

/**
 * The return value of the ServerAdmin.eval function. Could be a promise.
 * @type {string}
 * @private
 */
ServerAdmin._asyncReturnValue = 'Calling...';

// On the client, ServerAdmin.allowed always returns true.
ServerAdmin.allowed = function() {
    return true;
};

/**
 * Evaluate the following function as though it were written on the server in the global scope
 * @param func
 * @param callback
 * @returns {string}
 */
ServerAdmin.eval = function (func, callback) {
    Meteor.call("doctorpangloss:admin/admin", "(" + func.toString() + ")()", function (e, r) {
        if (callback) {
            callback(e, r);
        } else {
            if (!_.isUndefined(e)) {
                console.error(e);
            } else {
                console.log(r);
            }
        }
    });

    return ServerAdmin._asyncReturnValue;
};

// See if console is defined (IE 9 or lower doesn't have it)
if (window.console) {
    // Create an alias
    console.server = ServerAdmin.eval;
}
