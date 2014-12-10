### Admin

This package lets you run code on a live server for administrative and diagnostic purposes. Open your browser's
developer tools window, like Web Inspector, and pass a function to `console.server` to execute as though it were on
the server.

This is excellent for moderation, administrative and customer service tasks, where small easy scripts substitute
complex UIs and custom functionality.

##### Examples

Reset a user's password using Web Inspector on your live site:

```js
console.server(function() {
    Accounts.setPassword("gi9f31G2910hg", "newpassword");
});
```

##### Installing

 1. Remove the `insecure` package if you don't want to let everyone execute commands on the server.
 2. Set `Admin.allowed` to a function that checks if the provided `userId` is allowed to execute commands:
    ```js
    if (Meteor.isServer) {
        Admin.allowed = function(userId) {
            var user = Meteor.users.findOne(userId);

            // For example, check if the user's `role` is an administrator
            return user && user.role === 'administrator';
        }
    }
    ```
 3. Execute a command by opening up the browser's developer tools:
    
    ```js
    console.server(function() {
        // Prints 'Hello world!' to your terminal running the server
        console.log('Hello world!');
        return 'Hello client'!
    }, /* A callback when the server command is done, which receives the error and the result */
       function (e,r) {
        // Prints 'Hello world!' to the Web Inspector/Developer Tools console.
        console.log(r);
    });
    ```
 4. Carefully explain to customer service and analytics folks how to use it!

##### Limitations

You cannot pass values from the client to the server.

```js
// Doesn't work
var user = {_id: 'gi9f31G2910hg'};
console.server(function() {
    return Meteor.users.findOne(user._id);
});
```

Instead, bake the values by converting a complex document to JSON.

```js
var user = {_id: 'gi9f31G2910hg'};
JSON.stringify(user)

// Web inspector returns a string representing the user document. Copy it, and paste it into the body of the function
// you are passing to the server to execute.

console.server(function() {
    var user = JSON.parse('{"_id": "gi9f31G2910hg"}');
    return Meteor.users.findOne(user._id);
});
```
