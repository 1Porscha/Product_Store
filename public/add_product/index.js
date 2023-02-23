let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
    //send a request to Express
    //result id the response from the server

    //this capture the value from our javascript
    let imageString = document.getElementById('image-input').value
    let nameString = document.getElementById('name-input').value
    let descriptionString = document.getElementById('description-input').value
    let priceNumber = +document.getElementById('price-input').value
    let inventoryNumber = +document.getElementById('inventory-input').value

    //this is the data on the front end, we need to send to our server, so our servr can send it to our database
    const product ={
        imageString,
        nameString,
        descriptionString,
        priceNumber,
        inventoryNumber,

    }
    console.log(JSON.stringify(product))

    //post request because we are adding an item
    //create funtion and await response

    let response = await fetch('http://localhost:5000/create_product', {  //1st paramenter the URL, 2nd paramenter ID from our server 
        method: "POST",     
        headers: {
         'Content-Type': 'application/json', //let it know we are sending json to the database
        },
    body: JSON.stringify(product) //stringify js value to json 
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