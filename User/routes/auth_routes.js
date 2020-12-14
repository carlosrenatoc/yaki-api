const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation/auth_validation');


//Validator
const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});


//register user
router.post('/register', async (req,res) => {

    //validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email is already on db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('This email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser._id);
    }catch(err){
        res.status(400).send(err);
    }
});

//login user
router.post('/login', async (req,res) => {

    //validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email exists on db
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');

    //check if password is correct 
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).send('Email or password is wrong');

    //create and assign token
    const token = jwt.sign({_id: user._id, name: user.name, fl_name: user.fl_name, email: user.email}, process.env.JWT_KEY);
    res.header('auth-token', token).send(token);
});

module.exports = router;