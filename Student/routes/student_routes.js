const router = require('express').Router();
const User = require('../model/Student');
const user_controller = require('../controllers/student_controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const {registerValidation, loginValidation} = require('../validation/auth_validation');



router.get('/', user_controller.findAll);
router.get('/:userId', user_controller.findOne);
router.post('/', user_controller.create);
router.put('/:userId', user_controller.update);
router.delete('/:userId', user_controller.delete);



module.exports = router;