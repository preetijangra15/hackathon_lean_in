const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    //duplicate email error
    if(err.code===11000){
        errors.email = 'Email already in use!';
        return errors;
    }

    // incorrect email
    if( err.message === 'Incorrect Email!'){
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if( err.message === 'Incorrect Password!'){
        errors.password = 'That password is not correct';
    }

    //validation errors
    if(err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message; 
        });
    }
    return errors;
}

const handleErrorsAdmin = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    //duplicate email error
    if(err.code===11000){
        errors.email = 'Email already in use!';
        return errors;
    }

    // incorrect email
    if( err.message === 'Incorrect Email!'){
        errors.email = 'This email is not registered';
    }

    // incorrect password
    if( err.message === 'Incorrect Password!'){
        errors.password = 'That password is not correct';
    }

    //validation errors
    if(err.message.includes('admins validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message; 
        });
    }
    return errors;
}

const maxAge=3*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_USER, {
        expiresIn: maxAge
    });
}

const createTokenAdmin = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
        expiresIn: maxAge
    });
}

module.exports.dashboard_get = (req,res) => {
    res.render('dashboard');
}

module.exports.signup_post =async (req,res) => {
      const { name, email, password, degree, college, gradyear, linkedin } = req.body;
      try {
          const user = await User.create( {name, email, password, degree, college, gradyear, linkedin});
          const token = createToken(user._id);
          res.cookie('jwt',token, { httpOnly: true,maxAge: maxAge*1000});
          res.status(201).json({user: user._id});
      } 
      catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
      }
}

module.exports.login_post = async (req,res) => {
    res.clearCookie('jwtadm');
    const { email, password } = req.body;
    try {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token, { httpOnly: true,maxAge: maxAge*1000});
        res.status(200).json({user: user._id});
    } 
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
}

module.exports.adminlogin_post = async (req,res) => {
    res.clearCookie('jwt');
    const { email, password } = req.body;
    try {
        const admin = await Admin.login(email,password);
        const token = createTokenAdmin(admin._id);
        res.cookie('jwtadm',token, { httpOnly: true, maxAge: maxAge*1000});
        res.status(200).json({admin: admin._id});
    } 
    catch (error) {
        const errors = handleErrorsAdmin(error);
        res.status(400).json({errors});
    }
}

module.exports.adminsignup_post = async (req,res) => {
    const { name, email, password, organization, orgwebsite, linkedin } = req.body;
    try {
        const admin = await Admin.create({ name, email, password, organization, orgwebsite, linkedin });
        const token = createTokenAdmin(admin._id);
        res.cookie('jwtadm',token, { httpOnly: true,maxAge: maxAge*1000});
        res.status(201).json({admin: admin._id});
    } 
    catch (error) {
      const errors = handleErrorsAdmin(error);
      res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req,res) =>{
    res.cookie('jwt', '', { maxAge: 1});  //maxAge 1 ms; expires quickly
    res.redirect('/');
}

module.exports.adminlogout_get = (req,res) =>{
    res.cookie('jwtadm', '', { maxAge: 1});  //maxAge 1 ms; expires quickly
    res.redirect('/');
}