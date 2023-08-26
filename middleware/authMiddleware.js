const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    //check json web token exists & is verfied
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_USER, (err, decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/');
    }
}

const requireAuthAdmin = (req, res, next) =>{
    const token = req.cookies.jwtadm;
    //check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.redirect('/adminlogin');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/adminlogin');
    }
}

//check current user
 const checkUser = (req,res,next) => {
     const token = req.cookies.jwt;

     if(token) {
        jwt.verify(token, process.env.JWT_SECRET_USER, async (err, decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
     }
     else {
         res.locals.user = null;
         next();
     }
 }

 //check current admin
 const checkAdmin = (req,res,next) => {
    const token = req.cookies.jwtadm;

    if(token) {
       jwt.verify(token, process.env.JWT_SECRET_ADMIN, async (err, decodedToken)=>{
           if(err) {
               console.log(err.message);
               res.locals.admin = null;
               next();
           } else {
               console.log(decodedToken);
               let admin = await Admin.findById(decodedToken.id);
               res.locals.admin = admin;
               next();
           }
       });
    }
    else {
        res.locals.admin = null;
        next();
    }
}

 module.exports ={ requireAuth, requireAuthAdmin, checkUser, checkAdmin };
