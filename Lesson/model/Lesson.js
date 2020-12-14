const mongoose = require('mongoose-fill');
const Student = require('../../Student/model/Student');
const Turma = require('../../Turma/model/Turma');

const opts = { 
    toObject: {virtuals: true},
    toJSON: { virtuals: true } };
const LessonSchema = new mongoose.Schema({
    turma_id: {
        type: mongoose.ObjectId,
        required: true
    },
    schedule_id: {
        type: mongoose.ObjectId,
        required: true
    },
    day: {
      type: Date,
      required: true
    },
    attendances: [mongoose.ObjectId]
}, opts);


LessonSchema.virtual('presence_count').get(function () {
    return this.attendances.length;
});

LessonSchema.virtual('short_day').get(function () {
    let date = this.day;
    var dd = date.getDate();
    var mm =  (date.getMonth() + 1);
    if(dd<10)
        dd='0'+dd;
    if(mm<10)
        mm='0'+mm;

    return dd + "-" + mm + "-" +  date.getFullYear();
});

LessonSchema.fill('turma', function(cb){
    const turma = Turma.findOne({_id: mongoose.Types.ObjectId(this.turma_id)}).fill('students');
    return turma.exec(cb);
});



module.exports = mongoose.model('Lesson', LessonSchema);