const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        required: [true, 'Please Enter email'], 
        lowercase: true,
        unique: [true, 'Email already in use'],
        validate: [isEmail, 'Please enter valid email'] 
    },
    password: { 
        type: String, 
        required: [true, 'Please enter password'],
        minlength: [6, 'Minimum length of password should be 6']
    },
    organization:   { 
        type: String, 
        required: true
    },
    orgwebsite:  { 
        type: String, 
        required: true
    },
    linkedin: { 
        type: String, 
        required: true
    },
    imgurl: {type: String, default: "assets/img/profile.png"},
   });
  
adminSchema.pre('save', async function(next){
    const salt= await  bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
}) 

adminSchema.post('save', function(doc,next){
    console.log('New Admin Created', doc);
    next();
});  

adminSchema.statics.login = async function(email,password) {
    const admin = await this.findOne({email});
    if(admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if(auth) {
            console.log(admin);
            return admin;
        }
        throw Error('Incorrect Password!');
    }
    throw Error('Incorrect Email!');
}

const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
