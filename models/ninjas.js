const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//creating a geolocation schema
const GeoSchema=new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
});
//creating our schema
const NinjaSchema= new Schema({
    name:{
        type:String,
        required:[true, 'name field is required']
    },
    rank:{
        type:String
    },
    availability:{
        type:Boolean,
        default:false
    },
    //add in geolocation
    geometry:GeoSchema
});

//creating our model
const Ninja=mongoose.model('ninja', NinjaSchema);

module.exports= Ninja;