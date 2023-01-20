const router = require("express").Router();
const catagories = require('../model/Catagories');



//Create Catagories 
router.post("/",async (req,res)=>{
    const newCat = new catagories(req.body);
    try {
        const saveCat = await newCat.save();
        res.status(200).json(saveCat);

        
    } catch (error) {
        res.status(500).json(error);
        
    }
})




//Get Catagories 
router.get('/',async (req,res)=>{
    try {
        const cat = await catagories.find();
        res.status(200).json(cat);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
});


module.exports = router;