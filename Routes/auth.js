const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require("bcrypt");


//Register route 
router.post("/register",async(req,res)=>{
    try {
        //gen hash pass 
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password: hashPass,
        });
        const user = await newUser.save();
        res.status(200).json("User Register Successfully");
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
})

// login route

router.post("/login", async (req,res)=>{
    try {
        //find the user
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json("Wrong Credentials");

        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json("Wrong Credential");

        const {password, ...others} = user._doc;

        res.status(200).json(others);
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        
    }

});

//exports the file 
module.exports = router;