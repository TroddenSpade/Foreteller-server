const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
    subject:{
        type:String,
        required:true,
    },
    noOptions:{
        type:Number,
        required:true,
    },
    point:{
        type:Number,
        required:true,
    },
    options:{
        1: {
            type:String,
            required:true,
        },
        2: {
            type:String,
            required:true,
        },
        3: {
            type:String,
        },
        4: {
            type:String,
        },
    },
    1: {
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    2: {
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    3:{
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    4:{
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

const Poll = mongoose.model('Poll',PollSchema);

module.exports = { Poll };