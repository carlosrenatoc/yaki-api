const mongoose = require('mongoose');

const opts = { toJSON: { virtuals: true } };
const studentSchema = new mongoose.Schema({
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
    birthday: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    guardian: {
        type: String
    },
    current_belt: {
        type: String
    },
    turma :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turma'
    },
    customfields: [{
        customfieldID: mongoose.ObjectId,
        choice: String
    }]
}, opts);

studentSchema.virtual('age').get(function () {
    let date = this.birthday;
    let today = new Date();
    let timeDiff = today.getTime() - date.getTime();
    let age = Math.floor( timeDiff / ( 1000 * 3600 * 24 ) / 365 );
    return age;
});

studentSchema.virtual('short_birthday').get(function () {
    let date = this.birthday;
    var dd = date.getDate();
    var mm =  (date.getMonth() + 1);
    if(dd<10)
        dd='0'+dd;
    if(mm<10)
        mm='0'+mm;

    return date.getFullYear() + "-" + mm + "-" + dd;
});

studentSchema.virtual('first_name').get(function () {
    let name = this.name;
    let first_name = name.split(' ')[0];
    return first_name;
});

studentSchema.virtual('last_name').get(function () {
    let name = this.name;
    let last_name = name.split(' ').pop();
    return last_name;
});

studentSchema.virtual('fl_name').get(function () {
    return this.first_name + ' ' + this.last_name;
});


module.exports = mongoose.model('Student', studentSchema);