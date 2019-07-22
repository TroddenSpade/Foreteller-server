const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/configs/config').get();
const PORT = config.PORT ;
const SERVER = config.SERVER;
const app = express();

const { WRONG_PASSWORD,INVALID_EMAIL } = require('./src/types');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
});

const {User} = require('./src/models/User');

// GET
app.get('/api/hi',(req,res)=>{
    res.json({
        msg:"Hi There !"
    });
});

// POST
app.post('/api/signup',(req,res)=>{
    const user = new User(req.body);
    user.save((err,doc)=>{
        if(err){
            return res.status(400).json({
                signup:false,
                err:err,
            });
        }
        res.status(200).json({
            signup:true,
            user:doc
        });
    });
});

app.post('/api/signin',(req,res)=>{
    User.findOne({'email':req.body.email},(err1,user)=>{
        if(!user) return res.json({isAuth:false,err:INVALID_EMAIL});
        user.comparePassword(req.body.password,(err2,isMatch)=>{
            if(!isMatch) return res.json({isAuth:false,err:WRONG_PASSWORD});
            user.genToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.json({
                    isAuth:true,
                    user:user,
                });
            });
        });
    });
});

app.post('/api/checktoken',(req,res)=>{
    User.findById(req.body.id,(err,doc)=>{
        if(err) return res.json({valid:false});
        if(doc.token == req.body.token){
            res.json({valid:true,user:doc});
        }else{
            res.json({valid:false});
        }
    });
});

app.listen(PORT,()=>{
    console.log("It's Working !")
});