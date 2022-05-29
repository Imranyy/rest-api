const express=require('express');
const { geoSearch } = require('../models/ninjas');
const router=express.Router();
const Ninja=require('../models/ninjas')

//get a list of ninjas from db
router.get('/ninjas',(req,res,next)=>{
    //getting all the documents in the collection
    /*Ninja.find({}).then((ninja)=>{
        res.send(ninja);
    });*/
    Ninja.find(
    {nearSphere:{type:"Point", coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)],
    maxDistance:100000,spherical:true}}
    ).then((ninjas)=>{
        res.send(ninjas);
    });
});

//add a ninjas in db
router.post('/ninjas',(req,res,next)=>{
   Ninja.create(req.body).then((ninja)=>{
       res.send(ninja);
   }).catch(next);
});

//update a ninja to db
router.put('/ninjas/:id',(req,res,next)=>{
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
       Ninja.findOne({_id:req.params.id}).then((ninja)=>{
        res.send(ninja);
       }) 
    });
 });

//deleting ninja from db
router.delete('/ninjas/:id',(req,res,next)=>{
    Ninja.findByIdAndRemove({_id:req.params.id}).then((ninja)=>{
        res.send(ninja);
    })
});


module.exports=router;