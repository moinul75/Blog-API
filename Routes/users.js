const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const Post = require("../model/Post");



//Update user 
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password)
        {
            //gen salt and then get the pass with the salt 
            const salt = await bcrypt.genSalt(13);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            //update the user
            const userUpdate = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set: req.body,
                },
                {new: true}
            );
            res.status(201).json(userUpdate);
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            
        }

    }else{
        res.status(401).json("You cant update without your account");
        
    }
   
})

//Delete user 

router.delete("/:id", async (req,res)=>{
    //find the id and if match with id then use finduser and delete method
    if(req.body.userId === req.params.id)
    {
        try {
            const user = await User.findById(req.params.id);
            try {
                //now delete the user 
                //delete the user post 
                await Post.deleteMany({username:user.username})
                await User.findOneAndDelete(req.params.id);
                res.status(202).json("User has been deleted Successfully");
            } catch (error) {
                res.status(401).json(error);
                
            }
        } catch (error) {
            res.status(404).json("User Is Not Found!!");
            
        }
    }else{
        res.status(401).json("You cant Deleted Anyone account!!!");
    }
  

});

//GET The user by the user id 
router.get("/:id", async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(202).json(others);
        
    } catch (error) {
        console.log(error);
        res.status(500).json("No User is Found!!");
        
    }
})

//exports the file 
module.exports = router;