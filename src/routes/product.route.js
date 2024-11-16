const express=require("express");
const router=express.Router();
const controller=require("../controllers/product.controller");
const Token = require("../middlewares/authToken")
const singleUpload=require("../middlewares/multer")

router.use(Token.verifyToken)

router.route("/product")
.post(singleUpload,controller.productCreate)
.get(controller.getProduct)
.put(singleUpload,controller.updateProduct)
.delete(controller.deleteProduct)

router.route("/getoneproduct")
.get(controller.getOneProduct)

module.exports=router;