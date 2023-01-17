

const api_url = "http://localhost:8080/show"
async function getData(url){
    const response = await fetch(url);

    let data = await response.json();
    if(data.length != 0){
        let table = "";
        table += '<tr>'
        table += '<th>S.No</th>'
        table += `<th><div class="icon-tr"><span>Tasks</span><i onclick="sortTask('${api_url}')" id="sort-icon" class="fa-sharp fa-solid fa-sort sort-icon"></i></th></div>`
        table += '<th>Action</th></tr>'
        document.getElementById("thead").innerHTML = table;
    }
    else{
        let heading = document.getElementById("heading");
        heading.innerHTML = "No Task Added"
    }
    if(response){
        let show_data = "";
        data.map((element,index)=>{
            show_data += `<tr id="data_tr">`;
            show_data += `<td>${index+1}</td>`
            show_data += `<td class="todo_name">${element.todo}</td></td>`
            show_data += `<td><button onclick="updateTodo('${element._id}','${element.todo}')" class='edit-btn btn btn-primary'>Edit</button><button onclick="deleteTodo('${element._id}')" class='btn btn-danger m-2'>Delete</button><button onclick="completed(${index})" class='delete-btn btn btn-info'>Completed</button></td></tr>`
        })
        document.getElementById("tbody_task").innerHTML = show_data;
    }
}
getData(api_url);

// Add new task

async function addTodo(){
    let input_data = document.body.querySelector('.input_data').value;
    if(input_data.length<=0){
        alert("Please write something")
    }
    else{
    let data = {
        "todo": input_data
    }
    let x = await axios.post("http://localhost:8080/add", data, {
        'Content-Type':'application/json'
    });
    if(response){
        console.log(response);
    }     
    else{
        console.log("Data not added");
    }
}
}

//Update
async function updateTodo(id,todo){
    let input = document.getElementById("input");
    input.value = todo;
    let update_btn = document.querySelector("#update_btn");
    let add_btn = document.querySelector("#input_btn");
    update_btn.style.display = "block"
    add_btn.style.display = "none"

    update_btn.addEventListener("click",async(e)=>{
        e.preventDefault();
        let text = input.value;
        let data = {
            "todo":text
        }
        let x = await axios.put(`http://localhost:8080/update/${id}`,data,{
            'Content-Type':'application/json'
        });
        update_btn.style.display = "none";
        add_btn.style.display = "block"
        input.value = ""
        alert("Todo updated")
        location.reload();
    })       
}

//Delete
async function deleteTodo(id){
    let x = await axios.delete(`http://localhost:8080/delete/${id}`);
    location.reload();
}


// Completed task

function completed(index){
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");
    tr = Array.from(tr);
    let newTr = tr[index+1];
    let td = newTr.getElementsByTagName("td");
    td = Array.from(td);
    td[1].classList.toggle("line-through-text")


    let btn = td[2].querySelector(".edit-btn");
    let update_btn = document.getElementById("update_btn");
    if(td[1].classList.contains("line-through-text")){
        btn.disabled = true;
        update_btn.disabled = true;
    }
    else{
        btn.disabled = false;
        update_btn.disabled = false;
    } 
}

//Sort Task
async function sortTask(url){
    let data = await fetch(url);
    data = await data.json();
    console.log(data);
    data.map((element)=>{
        element.sort(function(a,b){
            if(a.todo < b.todo){
                return -1;
            }
            if(a.todo> b.todo){
                return 1;
            }
            return 0;
        })
        console.log(element);
    })
    element.sort();
}