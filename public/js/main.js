//Javascript that hanels our client side event listeners and immediately goes to server.js because our server is listening with app.listen to user input.

//Grabs everything with the class='del' and stores them in the array declared deleteBtn.
const deleteBtn = document.querySelectorAll('.del')
//Grabs everything with the class='not' and stores them in the array declared todoItem.
const todoItem = document.querySelectorAll('span.not')
//Grabs everything with the class='completed' and stores them in the array declared todoComplete.
const todoComplete = document.querySelectorAll('span.completed')

//Assigns an event listener to elements with the class ='del' in the array deleteBtn and adds an event listener on mouse clisck to execute the function deleteTodo.
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

//Assigns an event listener to elements with the class ='not' in the array todoItem and adds an event listener on mouse click to execute the function markComplete.
Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

//Assigns an event listener to elements with the class='complete' in the array todoComplete and adds an event listener on mouse click to execute the function markIncomplete.
Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})
//Function event listener is calling to delete a todo document.
async function deleteTodo(){
    //Go to object parentNode and grab the unique id that is set per document in the todos.ejs and saving it as the variable todoId then send it back up to our server.js.
    const todoId = this.parentNode.dataset.id
    try{
        //Sends a route, a method and a specific id of the object.
        const response = await fetch('todos/deleteTodo', {
            //Send the method delete from client side and send that to our server.js.
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            //Stringify the json object and pass it back up to the server so that the server knows exactly which item to delete.
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        //EJS rerenders without deleted item.
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//Function event listener is calling to update the object key value completed boolean to true adding the class completed if added and removing the class not in style.css.
async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        //Sends a route, a method, and a specific id of the object.
        const response = await fetch('todos/markComplete', {
            //Send the method put from client side and send that to our server.js.
            method: 'put',
            headers: {'Content-type': 'application/json'},
            //Stringify the JSON object and pass it back up to the server so that the server knows exactly which item to update.
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//Function event listener is calling to update the object key value complete boolean to false removing class completed if added and adding class not in style.css.
async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        //Sends a route, a method, and a specific id of the object.
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            //Stringify the JSON object and pass it back up to the server so that the server knows exactly which item to update.
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}