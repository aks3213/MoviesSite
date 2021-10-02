//handles connection to mongoDB db

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MovieManager',{useNewUrlParser:true, useUnifiedTopology: true }).then( ()=>{
    console.log("connected ");
}).catch((e)=>{
    console.log("error ");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports={
    mongoose
};