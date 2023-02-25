const express = require('express')
//install mongoose
const mongoose = require('mongoose'); 
require('dotenv').config()

//Import model
const MyProduct = require('./models/product')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}));

//serve public folder
app.use(express.static('public'));
//create collection string
//console.log(process.env.MONGOUSERNAME,process.env.MONGOPASSWORD)
console.log(MyProduct)

let connectionString =`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.srxdrsr.mongodb.net/StoreDatabase?retryWrites=true&w=majority`

//connect to cluster
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
     useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//let us know mongoose was successful  
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.get('/home',(req,res) => {
    console.log("request received at/ Home")

})

//Create product route, use information from req.body to create new product in collection
app.post('/create_product', async (req, res) =>{
  

    const {imageString: image, nameString: name, descriptionString: description, priceNumber: price, inventoryNumber: inventory} = req.body;
    
    // console.log("uploading to database")
    
    let returnedValue = await MyProduct.create({
      image, 
      name,
      description,
      price,
      inventory
    })  
    console.log(returnedValue)
    if (returnedValue){
    console.log("upload complete")
    }
     res.send(returnedValue)
   })
  

  //Display all products from the collections in our database
  app.get('/get_product_data', async (req, res) => {
    // get data from database using find method
    let response = await MyProduct.find({});
    console.log("Display Products");
    // send it back to front end
    res.json(response)
  })  

  //Display one specific product from the collection, based on the id
  app.get('/display_single_product/:id', async (req,res) => {
    //Get data from database 
    let showId = req.params.id
    console.log(showId)

    let response = await MyProduct.findOne({_id: showId})
    console.log(response)
    res.json(response)
  })

 

//  Display/search by name, based on the name in collection
  app.get('/get_product_by_name/:name', async (req, res) => {

    let showProduct = req.params.name;
   
    let regex = new RegExp(["^", showProduct, "$"].join(""), "i");

    let productRes = await MyProduct.find({ name: regex });

    if (productRes.length < 1) {
      res.json("This product is not in the database.");
    } else {
      res.json(productRes);
    }
    })

  //use infomation from req.body to edit specific product
  app.put('/edit_product/:id', async (req, res) => { 
    let id = req.params.id

    MyProduct.findByIdAndUpdate(id, req.body, {new: true}).then((name) => {
        res.send(name);
    })    

  })

  // delete product using ID
app.delete('/delete_product/:id', async (req, res) =>{
  let id = req.params.id

  let response = await MyProduct.deleteOne({_id: id})
  console.log(response)
  res.send({data: `deleted ${response.deletedCount} items.`})
})

//use information from req.body to change inventory after purchase
app.put('/buy_one_item/:id', async (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  
  let response = await MyProduct.findByIdAndUpdate(id, {inventory: req.body.inventory}, {new:true});
  console.log(response);
  res.send(response);
})


 app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})

