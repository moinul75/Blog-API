const mongoose = require("mongoose");
const nodemon = require("nodemon");

//postName. desc,Catagories,phot

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },decs:{
            type: String,
            required: true,
        },username:{
            type: String,
            required: true,
        },photo:{
            type: String,
            required: false,
        },catagories: {
            type: Array,
            required: false,

        }
    },
    {
        timestamps: true,
    }

);

//exports the post model
module.exports = new mongoose.model("Post",PostSchema);