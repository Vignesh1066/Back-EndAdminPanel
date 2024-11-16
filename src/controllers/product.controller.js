// const { log } = require("console");
const products=require("../models/product.model")
const fs=require("fs")


const productCreate=async (req,res)=>{
    // console.log(create);
    
    try{
        const { body, userData ,file} = req;
        
       let data={...body,
        userId:userData._id,
       }

       if(file){
        data={
            ...data,
             filePath:file.destination,
             fileOriginalName:file.originalname,
             fileName:file.filename,
             fileType:file.mimetype
         }; 
       }
        
        let createdData=await products.product.create(data)
        console.log(createdData,"create");
        
        res.json({
            createdData,
            Message:"Product Created Successfully..."
        })
    }
    catch(err){
          res.json({
            Error:err.message
          })
    }
}


const getProduct= async(req,res)=>{
try{
let userData=req.userData;
console.log(userData);

const allProduct=await products.product.find({userId:userData})
if(allProduct.length===0){
    return res.status(404).json({Message:"Product Not Found"})
}
res.json({allProduct,message:"Success....."})
}
catch(err){
res.json({error:err.message})
}
}


const getOneProduct= async(req,res)=>{
    try{
    const id = req.query
    console.log(id);
    
    const getOneProduct=await products.product.findById(id)
    if(!getOneProduct){
        return res.status(404).json({Message:"Product Not Found"})
    }
    res.json({getOneProduct,message:"Success....."})
    }
    catch(err){
    res.json({Error:err.message})
    }
    }



const updateProduct=async(req,res)=>{
    try{
    let {_id}=req.query;
    let newFile=req.file;
    data={
        ...req.body
    }
if(newFile){
    const oldFile = await products.product.findById(_id);
    if (!oldFile) {
        return res.status(404).json({ Message: "Product Not Found..." })
    };
   fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`)
   fileData={
            filePath:newFile.destination,
            fileOriginalName:newFile.originalname,
            fileName:newFile.filename,
            fileType:newFile.mimetype
   }
   data={
    ...data,
    ...fileData
   }

}
const updatedProduct = await products.product.findByIdAndUpdate(_id, data, { new: true })
res.json({updatedProduct,Message:"Product Updated Successfully..."})
    }
catch(err){
res.json({Error:err.message})
}
}



const deleteProduct=async(req,res)=>{
try{    
let {_id}=req.query;
const oldFile = await products.product.findById(_id);
if (oldFile.fileName) {
    fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
}
if (!oldFile) return res.status(404).json({ Message:"Product Not Found..." });
await oldFile.deleteOne();
res.json({ Message: "Product deleted successfully..." })
}
catch(err){
    res.json({Error:err.message})
}

}

module.exports={productCreate,getProduct,updateProduct,deleteProduct,getOneProduct};