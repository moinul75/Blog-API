const mongoose = require("mongoose");

//make user schema with username,email,(unique),profilepic ,timestamp 
const UserSchema =new  mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,

    },email:{
        type: String,
        required: true,
        unique: true,
    },password:{
        type: String,
        required: true,
    },profilePic:{
        type: String,
        default: " ",
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User",UserSchema); 