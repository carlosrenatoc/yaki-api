const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();

const verifyToken = require('./verifyToken');

//Import routes
const authRoute = require('./Modules/User/routes/auth_routes');
const studentRoute = require('./Modules/Student/routes/student_routes');
const customfieldRoute = require('./Modules/CustomField/routes/customfield_routes');
const turmaRoute = require('./Modules/Turma/routes/turma_routes');
const lessonRoute = require('./Modules/Lesson/routes/lesson_routes');
const { verify } = require('jsonwebtoken');

//Connect to db
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => console.log('connected to DB')
);

app.use(cors());
app.use(express.json());




//Route middleware
app.use('/api/user', authRoute);
app.use('/api/student', verifyToken, studentRoute);
app.use('/api/customfield', verifyToken, customfieldRoute);
app.use('/api/turma', verifyToken, turmaRoute);
app.use('/api/lesson', verifyToken, lessonRoute);



app.listen(process.env.PORT, () => console.log('Server running....'));