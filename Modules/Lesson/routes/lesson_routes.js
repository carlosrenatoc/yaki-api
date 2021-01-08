const router = require('express').Router();
const lesson_controller = require('../controllers/lesson_controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const {registerValidation, loginValidation} = require('../validation/auth_validation');


router.get('/', lesson_controller.findAll);
router.get('/:lessonId', lesson_controller.findOne);
router.post('/', lesson_controller.create);
router.put('/:lessonId', lesson_controller.update);
router.delete('/:lessonId', lesson_controller.delete);




module.exports = router;