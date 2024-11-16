const mongoose=require("mongoose");
const {v4} = require("uuid")

const productSchema=new mongoose.Schema({
    _id:{
        type:String,
        default: v4
    },
    userId:{
        type:String
    },
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true, 
    },
    productColor:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    fileName:{
        type:String    
    },
    filePath:{
        type:String
    },
    fileType:{
        type:String
    },
    fileOriginalName:{
        type:String
    }

},{timestamps:true});

const product=mongoose.model("VigneshProducts",productSchema);



module.exports={product}