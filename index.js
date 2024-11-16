const express = require("express");
const connections=require("./src/config/connectdb")
const authRoute=require("./src/routes/auth.route")
const productRoute=require("./src/routes/product.route")
const cors=require("cors")


const app = express();
app.use(cors("*"))
app.use(express.json());

connections.connect();
app.use("/auth", authRoute);
app.use("/private",productRoute);


app.use("/", (req, res) => {
    res.send("I'm alive")
});


const port = 7000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});