let editProductButton = document.getElementById('edit-product-button');
//Get the ID from URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let id = params.id;

console.log(id);

editProductButton.addEventListener('click', async () => {

    //send a request to Express
    //result id the response from the server
    //this capture the value from our javascript
    let image = document.getElementById('image-input').value
    let name = document.getElementById('name-input').value
    let description = document.getElementById('description-input').value
    let price = +document.getElementById('price-input').value
    let inventory = +document.getElementById('inventory-input').value

    //this is the data on the front end, we need to send to our server, so our server can send it to our database
    const editedProduct = {    
        image,
        name,
        description,
        price,
        inventory,

    }
    console.log(JSON.stringify(editedProduct))
    
    //put request because we are changing the item
    //create funtion and await response
    let response = await fetch(`http://localhost:5000/edit_product/${id}`, {  //1st paramenter the URL, 2nd paramenter ID from our server 
        method: "PUT",     
        headers: {
         'Content-Type': 'application/json', //let it know we are sending js to the database
        },
    body: JSON.stringify(editedProduct) //stringify js value to json 
    
    })

    let uploadStatusTag = document.getElementById('upload-status');
    
    //create a conditional to show item updated correctly
    if (response.status === 200) {
        console.log(response);
        console.log("upload complete!!!");
        uploadStatusTag.textContent = "Upload Completed";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("upload failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }
}) 

//add function to go back home
let homePageButton = document.getElementById('home-page-button')

homePageButton.addEventListener('click', ()=>{
    window.location.href = '../index.html'
  
})


