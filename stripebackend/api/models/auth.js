const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        required : true,
        type : String,
    },
    password : {
        required : true,
        type : String,
    }
})

module.exports = mongoose.model('User',userSchema)