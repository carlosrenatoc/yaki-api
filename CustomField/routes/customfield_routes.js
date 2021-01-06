const router = require('express').Router();
const customfield_controller = require('../controllers/customfield_controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const {registerValidation, loginValidation} = require('../validation/auth_validation');



router.get('/', customfield_controller.findAll);
router.get('/:customfieldId', customfield_controller.findOne);
router.post('/', customfield_controller.create);
router.put('/:customfieldId', customfield_controller.update);
router.delete('/:customfieldId', customfield_controller.delete);



module.exports = router;