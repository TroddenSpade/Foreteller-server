const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/configs/config').get();
const PORT = config.PORT ;
const SERVER = config.SERVER;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
});

app.get('/api/hi',(req,res)=>{
    res.json({
        msg:"hi"
    });
});

app.listen(PORT,()=>{
    console.log("It's Working !")
});