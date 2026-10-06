const cl = console.log;
const list  = document.getElementById("list");
const form = document.getElementById("form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const submit = document.getElementById("submit");
const update = document.getElementById("update");
const spinner = document.getElementById("spinner");

const BASE_URL = "https://fetch-api-crud-e52ad-default-rtdb.asia-southeast1.firebasedatabase.app"
const TODO_URL = `${BASE_URL}/todo3.json`

//state 
let state ={
    todoArr :[],
    edit_ID : null
}
//spinner
function toggleSpinner(){
spinner.classList.toggle("d-none");
}
//snackBar
function snackBar(msg, icon){
    Swal.fire({
     text:msg,
     icon:icon,
     timer:2500
    })
}
//read 
function showOnUi(){
  toggleSpinner();
  fetch(TODO_URL,{
    method:"GET",
    body: null,
    headers:{
       "content-type": "application/json",
       "authorization":"JWT token"
    }
  })
  .then((res)=>{
    if(!res.ok){
        throw new Error();
    }
    return res.json();
  })
  .then((data)=>{
    cl(data);
    for(const key in data){
      data[key].id = key;
      state.todoArr.push(data[key]);
    }
    templeting(state.todoArr);
  })
  .catch((err)=>{
  snackBar("something went wrong","error");
  })
  .finally(()=>{
    toggleSpinner();
  })

}
showOnUi();


//templeting
function templeting(arr){
      let result = ``;
arr.forEach(ele => {
    result += `
              <li class="list-group-item">
                <strong>${ele.title}</strong>
                        <P>${ele.description}</P>
                    <div>
                        <br>
                        <button class="btn btn-warning btn-sm ">Edit</button>
                        <button class="btn btn-success btn-sm ">Delete</button>
                    </div>
              </li>
    `
});
list.innerHTML = result;
}