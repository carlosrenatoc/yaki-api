//const Turma = require('../model/Turma');
var moment = require('moment-weekdaysin');

const Lesson = require('../model/Lesson');
const Student = require('../../Student/model/Student');
const Turma = require('../../Turma/model/Turma');

const mongoose = require('mongoose');



exports.findAll = async (req, res) => {
    // var filter = {};
    // if (req.body.student !== undefined)
    // {
    //     filter.attendances.student_id = mongoose.Types.ObjectId(req.body.student);
    // }

    // var lesson = new Lesson({
    //     turma_id: '5e81fe7cd0e58610608ee0b9',
    //     schedule_id: '5e95db0fd714d622589c7e82',
    //     day: moment().weekdaysInMonth('monday')[1],
    //     attendances: ['5e6a07e1b915ba4218eccdad']

    // })
    // await lesson.save();

    if (req.query.get == 'days'){
        if (req.query.turma){
            var turma = await Turma.findOne({_id: req.query.turma}).fill('student_count');
            var attendance_days = {};
            console.log(turma.schedule);
            //turma.schedule.forEach(schedule => {
            for (schedule of turma.schedule) {    
                attendance_days[schedule.weekday] = {};
                attendance_days[schedule.weekday]['schedule'] = schedule;
                var days = moment().month(req.query.month).year(req.query.year).weekdaysInMonth(schedule.weekday);
                var days_short = [];
                //days.forEach(day => {
                for (day of days) {
                    var lesson = await Lesson.findOne({turma_id: turma._id, schedule_id: schedule._id, day: day});
                    console.log(lesson)
                    var data = {day: day.format('DD-MM-YYYY')};
                    if (lesson)
                        data['lesson'] = lesson;
                    else
                        data['lesson'] = lesson;

                    if (moment().valueOf() < day.valueOf())
                        data['future'] = true;
                    days_short.push(data)
                };
                attendance_days[schedule.weekday]['days'] = days_short;
            };
            console.log(attendance_days);
            res.send({attendance_days: attendance_days, turma:turma});
        }
    }
    else if(req.query.get == 'lessonsdays'){
        var begin = req.query.begin;
        var end = req.query.end;
        // begin = moment(begin, "MM-DD-YYYY");
        // end = moment(end, "MM-DD-YYYY");

        var turmas = await Turma.find();

        var lessons = [];
        console.log('------------------');
        console.log(turmas);

        for(turma of turmas){
            var attendance_days = {};
            console.log('------------------');
            console.log(turma);
            for (schedule of turma.schedule) {    
                attendance_days[schedule.weekday] = {};
                attendance_days[schedule.weekday]['schedule'] = schedule;
                var days = moment(begin, "MM-DD-YYYY").weekdaysInBetween(moment(end, "MM-DD-YYYY"),schedule.weekday);
                // if(typeof days != Array)
                //     days = [days];
                var days_short = [];
                if(days.length){
                    for (day of days) {
                        var lesson = await Lesson.findOne({turma_id: turma._id, schedule_id: schedule._id, day: day});
                        console.log(lesson)
                        var data = {day: day.format('DD-MM-YYYY')};
                        if (lesson)
                            data['lesson'] = lesson;
                        else
                            data['lesson'] = lesson;

                        if (moment().valueOf() < day.valueOf())
                            data['future'] = true;
                        days_short.push(data)
                    };
                    attendance_days[schedule.weekday]['days'] = days_short;
                }
                else{
                    var lesson = await Lesson.findOne({turma_id: turma._id, schedule_id: schedule._id, day: days});
                        console.log(lesson)
                        var data = {day: days.format('DD-MM-YYYY')};
                        if (lesson)
                            data['lesson'] = lesson;
                        else
                            data['lesson'] = lesson;

                        if (moment().valueOf() < day.valueOf())
                            data['future'] = true;
                        days_short.push(data)
                        attendance_days[schedule.weekday]['days'] = days_short;
                }
            };
            lessons.push({attendance_days: attendance_days, turma:turma}); 

        };

        res.send(lessons);

    }
    // Attendance.find(filter)
    // .then(attendances => {
    //     res.send(attendances);
    // })
}

exports.findOne = async (req, res) => {
    const lessonID = req.params.lessonId;
    Lesson.findOne({_id: lessonID}).fill('turma')
    .then(lesson => {
        lesson.turma.fill('students');
        console.log(lesson)
        res.send(lesson);
    });
}

exports.create = async (req, res) => {
    const lesson = new Lesson({
        turma_id: req.body.turma_id,
        schedule_id: req.body.schedule_id,
        day: req.body.day
    });
    try{
        const savedLesson = await lesson.save();
        console.log(savedLesson);
        res.send(savedLesson);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.update = async (req, res) => {
    const lessonID = req.params.lessonId;
    var lesson = await Lesson.findOne({_id: lessonID});
    
    if (req.body.student_list !== undefined){
        var student_list = req.body.student_list;
        if (student_list !== 'none')
            lesson.attendances = student_list;
        else
            lesson.attendances = [];
    }
    const saved_lesson = await lesson.save();

    res.send(saved_lesson);
}

exports.delete = (req, res) => {

    const lessonID = req.params.lessonId;
    
    Lesson.deleteOne({_id: lessonID}, function (err) {
        if(err) console.log(err);
        res.send('sucessfull');
      });
}