console.log("js file is connected")

let addPageButton = document.getElementById("add_button");

addPageButton.addEventListener('click', () => {
    // change HTML files (from index to add_product)
    window.location.href = "./add_product"
})


//make request to display all items
//create a display funtion and await response
const getAndDisplayData = async () =>{

    let response = await fetch("http://localhost:5000/get_product_data");
    let data = await response.json()
    console.log(data);
    let parentContainer = document.getElementById("container")
//map through data and for each item add to screen
    data.forEach(item =>{
        let itemContainer = document.createElement("div")
        itemContainer.innerHTML = `
        <h1>${item.name}</h1>
        <img src=${item.image} width="200" length="200" />
        `
//add function to go to specific item when clicked        
        itemContainer.addEventListener("click", () => { 
            console.log("click", item._id)
            window.location.href = `./display_single_product/?id=${item._id}`
        })
        parentContainer.appendChild(itemContainer)

})
}

 getAndDisplayData ()
