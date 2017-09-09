// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'        : '270422293458395', // your App ID
        'clientSecret'    : '12055135acb975362f08947cf52f8782', // your App Secret
        'callbackURL'     : 'http://localhost:3000/users/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    }
};
