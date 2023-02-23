//home of our product model

//bring in mongoose
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    price: Number,
    inventory:Number,
    
});

const MyProduct = mongoose.model('MyProduct', productSchema)

module.exports = MyProduct;