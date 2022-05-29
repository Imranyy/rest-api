const express=require('express');
const routes=require('./routes/api');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')

//set express app
const app =express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise=global.Promise;
//middleware to serve our front-end static files
app.use(express.static('public'));
//bodyparser 1st middleware 
app.use(bodyParser.json());

//using routes 2nd middleware 
app.use('/api',routes);

//error handle 3rd middleware
app.use((err,req,res,next)=>{
    res.status(422).send({error: err.message});
})

//listen to request
app.listen(process.env.port||3000, ()=>{
    console.log('listening to port 3000')
})