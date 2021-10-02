const mongoose = require('mongoose');

const MovieSchema=new mongoose.Schema({
    title:{
        type:String,
        minLength:1,
        trim:true,
        unique: true
    },
    genre:{
        type:String
    },
    details:{
        type:String
    },
    size:{
        type:Number
    },
    quality:{
        type:Number
    }
});

const Movie=mongoose.model('Movie',MovieSchema);

module.exports ={
    Movie
};