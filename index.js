const express = require("express");
const app  = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authUser = require("./Routes/auth");
const updateUser = require("./Routes/users");
const postRoute = require('./Routes/posts');
const CatagoriesRoute = require('./Routes/catagories');
const multer = require("multer");
const bodyparser = require("body-parser");

const url = 'mongodb+srv://udoy752:udoy2326@cluster0.rdovm.mongodb.net/blogAPI'

dotenv.config();
//use json 
// app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//mongoose connection
mongoose.set("strictQuery", false);
mongoose.connect(url,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MONGO DB IS CONNECTED SUCCESSFULL");
})
.catch((err)=>{
    console.log(err);
    process.exit(1);
});

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images");

    },
    filename: (req,file,cb)=>{
        cb(null,"upload.png");
    },
});

const upload = multer({storage: storage});

//upload method 
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been Uploaded Successfully");
});


const port = 5000 ||process.env;
//main route
app.get('/',(req,res)=>{
    res.send("Hello world");
})

//use all the router 
app.use("/api/auth",authUser);
app.use("/api/users",updateUser);
app.use("/api/posts/",postRoute);
app.use("/api/catagories",CatagoriesRoute);


app.listen(port,(req,res)=>{
    console.log(`server is running on localhost:${port}`);
})