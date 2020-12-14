const Student = require('../model/Student');

exports.findAll = (req, res) => {

    var query = Student.find().populate('turma');
    if (req.query.turma == 'no')
    {
        query = Student.find({turma: null});
    }
    
    query
    .then(students => {
        res.send(students);
    })
}

exports.findOne = (req, res) => {
    const userID = req.params.userId;
    Student.findOne({_id: userID}).populate('turma')
    .then(student => {
        res.send(student);
    })
}


exports.create = async (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
        guardian: req.body.guardian,
        current_belt: req.body.belt,
        turma: req.body.turma_id

    });
    try{
        const savedStudent = await student.save();
        res.send(savedStudent);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.update = async (req, res) => {
    const userID = req.params.userId;
    const data_update = {
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
        guardian: req.body.guardian,
        current_belt: req.body.belt,
        turma: req.body.turma_id
    };
    const student_updated = await Student.findOneAndUpdate({_id: userID}, data_update, {new:true});
    console.log(student_updated);
    res.send(student_updated);
}

exports.delete = (req, res) => {

    const userID = req.params.userId;
    
    Student.deleteOne({_id: userID}, function (err) {
        if(err) console.log(err);
        res.send('sucessfull');
      });
}