const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'An Email with that address has already been registered, please use another one']
    },
    password: {
        type: String
    },
    name : {
        type: String,
        required: [true, 'name is required']
    },
    isGoogle: {
        type: Boolean
    },
    todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
}, {
    timestamps: true
})

var User = mongoose.model('User', userSchema);

module.exports = User;