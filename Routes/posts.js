const router = require("express").Router();
const User = require("../model/User");
const Post = require("../model/Post");

// CREATE POST 
router.post("/",async (req,res)=>{
    const newPost = new Post(req.body);
    try {
        //save the post and sent successfull status 
        const savePost = await newPost.save();
        res.status(202).json(savePost);
        
    } catch (error) {
        res.status(500).json("Post not found")
        
    }
});

//UPDATE POST 

router.put('/:id' ,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set: req.body,

                },{new: true}
                );
                res.status(200).json(updatePost);
                
            } catch (error) {
                res.status(500).json(error);
                
            }
        }else{
            res.status(401).json("You Can Update only your Account only");
        }
        

    } catch (error) {
        res.status(500).json(error);
        
    }
})

//DELETE POST 
router.delete('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try {
                await post.delete();
                res.status(200).json("Post Has Been Deleted Successfully!!");

                
            } catch (error) {
                res.status(500).json(error);
                
            }
        }else{
            res.status(402).json("You can delete only your Posts");
        }
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})


//GET POST 
router.get('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})


//GET ALL POST 
router.get("/",async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    
    try {
        let posts;
        if(username)
        {
            posts = await Post.find({username:username});
        }else if(catName)
        {
            posts = await Post.find({
                catagories: {
                    $in : [catName],
                },
                
            });
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);

        
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})


module.exports = router;

