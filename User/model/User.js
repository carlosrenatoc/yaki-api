const mongoose = require('mongoose');

const opts = { toJSON: { virtuals: true } };
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    type: {
        type: [String],
        enum: ['admin','trainer','student'],
        required: true
    },
    customfields: [{
        customfieldID: mongoose.ObjectId,
        choice: String
    }]
}, opts);

userSchema.virtual('first_name').get(function () {
    let name = this.name;
    let first_name = name.split(' ')[0];
    return first_name;
});

userSchema.virtual('last_name').get(function () {
    let name = this.name;
    let last_name = name.split(' ').pop();
    return last_name;
});

userSchema.virtual('fl_name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('User', userSchema);