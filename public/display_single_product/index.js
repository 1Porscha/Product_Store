// const { response, json } = require("express");

console.log("js running")

//Get the ID from URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let id = params.id;

console.log(id);

//use id to get info from mongobd
//with data from mongobd display product on page
//create funtion and await response
 const getSingleItem = async () => {
    let response = await fetch(`http://localhost:5000/display_single_product/${id}`)

    let finalResponse = await response.json();

    console.log(finalResponse);
 //use this finalData to display item information
    let containerElement = document.getElementById('container')
    containerElement.innerHTML = `
    <div class="single-product">
        <h1>${finalResponse.name}</h1>
        <img src=${finalResponse.image} width="200" length="200"/>
        <h3>${finalResponse.description}</h3>
        <h3> Price $${finalResponse.price}</h3>
        <h3>${finalResponse.inventory} Remaining Inventory </h3>
        
     </div>
    `
    //add function to buy button
    let buyButton = document.getElementById("buy-button")
    buyButton.addEventListener('click', async () => {
        console.log(finalResponse)

    //subtract 1 from remainng inventory    
        finalResponse.inventory = finalResponse.inventory -1

    //Disable and create conditional if item is out of stock 
        if (finalResponse.inventory <= 0){
            buyButton.disabled = true
            remainingInventory.innerHTML = "out of stock"
        } else 
        remainingInventory.innerHTML = finalResponse.inventory
        remainingInventory.innerHTML = `${finalResponse.inventory} remaining, purchase before they are gone.`

 //put request because we are changing the item
    //create funtion and await response
    
        let response = await fetch(`http://localhost:5000/buy_one_item/${id}`, { //1st paramenter the URL, 2nd paramenter ID from our server 
            method: "PUT",
            headers: {
                'Content-Type': 'application/json' //let it know we are sending js
            },
            body: JSON.stringify({ inventory: finalResponse.inventory })   //stringify js value to json        
        });
    //This will load the page after we subtract one item     
        location.reload()
    })   
   }

  getSingleItem()

//create function to delete ID from database
//create funtion and await response
 let deleteButton = document.getElementById('delete-button')

 deleteButton.addEventListener('click', async () =>{
 
     let response = await fetch(`http://localhost:5000/delete_product/${id}`, { //1st paramenter the URL, 2nd paramenter ID from our server 
         method: "delete",
     });
     // console.log(response);
     
     let parsedData = await response.json()
     console.log(parsedData);
 }) 

//create funtion to search for product
//create funtion and await response 
let searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', async () =>{

    
    let searchName = document.getElementById('search-name').value 
    console.log(searchName);
    
  
        let response = await fetch(`http://localhost:5000/get_product_by_name/${searchName}`); //1st paramenter the URL, 2nd paramenter name from our server 
        console.log(response)
        let finalData = await response.json();   
            
        //display specific item on screen, when we search item, it will display item at index 0 
            let containerElement = document.getElementById('container')
            containerElement.innerHTML = `
            <div class="single-product">
                <h1>${finalData[0].name}</h1>
                <img src=${finalData[0].image} width="200" length="200"/>
                <h3>${finalData[0].description}</h3>
                <h3> Price $${finalData[0].price}</h3>
                <h3>${finalData[0].inventory} Remaining Inventory </h3>
             </div>
             `
    })
      
//add function to go back home      
let homePageButton = document.getElementById('home-page-button')

homePageButton.addEventListener('click', ()=>{
    window.location.href = '../index.html'
  
})

//add function to go to edit page
let editPageButton = document.getElementById("edit-page-button")

editPageButton.addEventListener('click', ()=>{
    window.location.href = `../edit_product/?id=${id}`;
  
})


