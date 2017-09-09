// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our review model
var reviewSchema = mongoose.Schema({

        subject        : String,   // subject of the review
        rating         : Number,
        userid         : String,
        comment        : String    // comment text of the review


});

// create the model for users and expose it to our app
module.exports = mongoose.model('Review', reviewSchema);
