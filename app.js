const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();

const verifyToken = require('./verifyToken');

//Import routes
const authRoute = require('./User/routes/auth_routes');
const studentRoute = require('./Student/routes/student_routes');
const turmaRoute = require('./Turma/routes/turma_routes');
const lessonRoute = require('./Lesson/routes/lesson_routes');
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
app.use('/api/turma', turmaRoute);
app.use('/api/lesson', verifyToken, lessonRoute);



app.listen(process.env.PORT, () => console.log('Server running....'));