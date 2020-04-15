const mongoose = require('mongoose')
//const validator = require('validator')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 15
    },
    // email:{
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,

    // }
},
{
    timestamps: true
}
)

const User = mongoose.model('User', UserSchema)

module.exports = User