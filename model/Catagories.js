const mongoose = require("mongoose");

const CatagoriesSchema = new mongoose.Schema(
    {
        name:{
            type: String ,
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Catagories",CatagoriesSchema);