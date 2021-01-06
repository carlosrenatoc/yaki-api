const Turma = require('../model/Turma');
const Student = require('../../Student/model/Student');
const mongoose = require('mongoose');



exports.findAll = (req, res) => {
    Turma.find().fill('students student_count')
    .then(turmas => {
        res.send(turmas);
    })
}

exports.findOne = (req, res) => {
    const turmaID = req.params.turmaId;
    Turma.findOne({_id: turmaID}).fill('students student_count')
    .then(turma => {
        res.send(turma);
    })
}


exports.create = async (req, res) => {
    const turma = new Turma({
        name: req.body.name,
        monthly_payment: req.body.monthly_payment

    });
    try{
        const savedTurma = await turma.save();
        res.send(savedTurma);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.update = async (req, res) => {
    const turmaID = req.params.turmaId;
    console.log(req.body)
    if (req.body.name !== undefined){
        var data_update = {};
        if (req.body.name) data_update.name = req.body.name;
        if (req.body.monthly_payment) data_update.monthly_payment = req.body.monthly_payment;
        
        const turma_updated = await Turma.findOneAndUpdate({_id: turmaID}, data_update, {new:true});
        console.log(turma_updated);
        res.send(turma_updated);
    }
    else if (req.body.students_add !== undefined){
        var students = req.body.students_add;
        const success = await Student.updateMany({ _id: { "$in": students } }, {turma: mongoose.Types.ObjectId(turmaID)})
        res.send(success)
    }
    else if (req.body.students_remove !== undefined){
        var students = req.body.students_remove;
        const success = await Student.updateMany({ _id: { "$in": students } }, {turma: null})
        res.send(success)
    }
    else if (req.body.schedule_add !== undefined){
        var schedule_add = req.body.schedule_add;
        Turma.findOne({_id: turmaID})
        .then(turma => {
            turma.schedule.push(schedule_add);
            turma.save();
            res.send(turma);
        })

    }
    else if (req.body.schedule_remove !== undefined){
        var schedule_remove = req.body.schedule_remove;
        Turma.findOne({_id: turmaID})
        .then(turma => {
            turma.schedule.id(schedule_remove).remove()
            turma.save();
            res.send(turma);
        })
    }
    else{
        console.log('nope')
    }
   
}

exports.delete = (req, res) => {

    const turmaID = req.params.turmaId;
    
    Turma.deleteOne({_id: turmaID}, function (err) {
        if(err) console.log(err);
        res.send('sucessfull');
      });
}