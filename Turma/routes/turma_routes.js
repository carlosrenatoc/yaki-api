const router = require('express').Router();
const User = require('../model/Turma');
const turma_controller = require('../controllers/turma_controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const {registerValidation, loginValidation} = require('../validation/auth_validation');


router.get('/', turma_controller.findAll);
router.get('/:turmaId', turma_controller.findOne);
router.post('/', turma_controller.create);
router.put('/:turmaId', turma_controller.update);
router.delete('/:turmaId', turma_controller.delete);



module.exports = router;