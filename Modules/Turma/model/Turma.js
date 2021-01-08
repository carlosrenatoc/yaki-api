const mongoose = require('mongoose-fill');
const Student = require('../../Student/model/Student');

const opts = { toJSON: { virtuals: true } };
const turmaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    monthly_payment: {
      type: Number,
      required: true
  },
  schedule: [{
    weekday: String,
    begin: String,
    end: String

  }],
  color: {
    type: String,
    required: true,
    min: 6,
    max:255
  },
  customfields: [{
    customfieldID: mongoose.ObjectId,
    choice: String
  }]
}, opts);

turmaSchema.methods.getStudents = function(cb) {
    return Student.find({turma: mongoose.Types.ObjectId(this._id)}, cb);
};

turmaSchema.fill('students', function(cb){
  return Student.find({turma: mongoose.Types.ObjectId(this._id)}, cb);
})

  turmaSchema.fill('student_count').get(function (cb) {
    return Student.countDocuments({turma: mongoose.Types.ObjectId(this._id)}, cb);
});

turmaSchema.path('schedule').schema.virtual('begin_time').get(function() {
  var begin = this.begin.slice(0,2) + ":" + this.begin.slice(-2) + "h";

  return begin;
});

turmaSchema.path('schedule').schema.virtual('end_time').get(function() {
  var end = this.end.slice(0,2) + ":" + this.end.slice(-2) + "h";

  return end;
});

turmaSchema.path('schedule').schema.virtual('time').get(function() {

  return this.begin_time + "-" + this.end_time;
});


turmaSchema.path('schedule').schema.options.toJSON = { virtuals: true };



module.exports = mongoose.model('Turma', turmaSchema);