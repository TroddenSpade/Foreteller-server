const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs/config').get();
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    avatar:{
        type:String,
        default:"",
    },
    token:{
        type:String,
    },
    point:{
        type:Number,
        default:1
    },
    noPosts:{
        type:Number,
        default:0
    }
});

userSchema.pre('save',function(next){
    let user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

userSchema.methods.comparePassword = function(pass,cb){
    let user = this;
    bcrypt.compare(pass,user.password,function(err,isMatch){
        if(err) return cb(err);
        cb(err,isMatch);
    });
};

userSchema.methods.genToken = function(cb){
    const token = jwt.sign(this._id.toHexString(),config.SECRET);
    this.token = token;
    this.save((err,user)=>{
        if(err) return cb(err);
        cb(err,user);
    });
};

userSchema.statics.findByToken = function(token,cb){
    let user = this;
    jwt.verify(token,config.SECRET,(err,decode)=>{
        user.findOne({'_id':decode,token:token},(err,user)=>{
            if(err) return cb(err);
            cb(null,user);
        });
    });
}

const User = mongoose.model('Users',userSchema);

module.exports = { User };