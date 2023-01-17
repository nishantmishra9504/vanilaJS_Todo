let api_url = "http://localhost:8080/show";
let completed = false;
let arr = [];
async function showData(url,status){
    const response = await fetch(url);
    let data = await response.json();
    let container = document.body.querySelector(".task-list");
    let active_btn = document.getElementById("active-btn");
    let completed_btn = document.getElementById("completed-btn");
    let all_btn = document.getElementById("all-btn");

    let btn_container = document.body.querySelector('action-btn-container');
    let text = "";
    if(data.length != 0 && status == false){
        container.style.display = "block";
        active_btn.style.display = "block";
        completed_btn.style.display = "block";
        all_btn.style.display = "block";
        data.map((element,index)=>{
            //console.log(element);
            text += '<div class="tasks active_div">'
            text += `<input value='${element.todo}' type="text" readonly class="form-control tasks_input_field active" onclick="complete('${index}')" ondblclick="editItem('${element._id}','${index}')" aria-describedby="emailHelp">
            <i class="fa-solid fa-trash delete-btn" onclick="deleteTodo('${element._id}')"></i>`
            text += '</div>'
        })
        container.innerHTML = text;
        // activeCont.style.display = "none";
        // completedCont.style.display = "none";
    }
    // else if(data.length != 0 && completed == true){
    //     completed_task();
    // }
    // else if(data.length != 0 && completed == false){
    //     all_task();
    // }
}
showData(api_url,completed)

//ADD Items
async function addItem(){
    let input = document.body.querySelector("#input_field");
    let text = input.value;
    if(text.length<=0){
        alert("Please write something")
    }
    else{
    let data = {
        "todo": text
    }
    let x = await axios.post("http://localhost:8080/add", data, {
        'Content-Type':'application/json'
    });
    if(x){
        text="";
        location.reload();
    }
    else{
        alert("Todo not added")
    }
}
}

//Delete Item
async function deleteTodo(id){
    let x = await axios.delete(`http://localhost:8080/delete/${id}`);
    location.reload();
}


//Update Todo
async function editItem(id,index){
    let input_field = document.getElementsByClassName("tasks_input_field")[index];
    input_field.removeAttribute("readonly");
    input_field.addEventListener("keyup",async (e)=>{
        let text = input_field.value;
        if(e.keyCode == 13){
            text = input_field.value;
            let data = {
                "todo":text
            }
            let x = await axios.put(`http://localhost:8080/update/${id}`,data,{
                'Content-Type':'application/json'
            });
            if(x){
                alert("Todo updated")
                location.reload();
            }
        }
    })
}

function complete(index){
    let tasks_input_field = document.getElementsByClassName("tasks_input_field")[index];
    let tasks_div = document.getElementsByClassName("tasks")[index];
    tasks_input_field.classList.toggle('completed');
    tasks_input_field.classList.remove('active');
    tasks_div.classList.toggle('completed_div');

}

//Completed List

function completed_task(){
    let input_field = document.getElementsByClassName("completed");
    let container = document.body.querySelector("#task-list2");
    let maincont = document.body.querySelector(".task-list");
    let activeCont = document.body.querySelector("#task-list3");
    //let tasks = document.body.querySelector(".tasks");
    container.style.display = "block";
    container.innerHTML = "";
    if(input_field.length==0){
        location.reload();
    }
    input_field = Array.from(input_field);
    input_field.map((element,index)=>{
        console.log(element);
        container.innerHTML += '<div class="tasks">'
        container.innerHTML += `<input value='${element.value}' type="text" readonly class="form-control tasks_input_field completed" onclick="complete('${index}')" ondblclick="editItem('${element._id}','${index}')" aria-describedby="emailHelp">`
        container.innerHTML += '</div>'
    })
    
    maincont.style.display = "none";
    activeCont.style.display = "none";
    // container.style.display = "block";
    // container.innerHTML = text;
}

//Active task
async function active_task(){
    let input_field = document.getElementsByClassName("active");
    let container = document.body.querySelector("#task-list3");
    let maincont = document.body.querySelector(".task-list");
    let completedCont = document.body.querySelector("#task-list2");
    container.style.display = "block";
    container.innerHTML = "";
    if(input_field.length != 0){
        input_field = Array.from(input_field);
        input_field.map((element, index)=>{
            container.innerHTML += '<div class="tasks">'
            container.innerHTML += `<input value='${element.value}' type="text" readonly class="form-control tasks_input_field active" onclick="complete('${index}')" ondblclick="editItem('${element._id}','${index}')" aria-describedby="emailHelp">`
            container.innerHTML += '</div>'
        })
        
        maincont.style.display = "none";
        completedCont.style.display = "none";
    }   
}
function all_task(){
    location.reload();
    console.log("hit");
}

function sort_data(){
    let container = document.getElementsByClassName('task-list')[0];
    let div = container.getElementsByClassName("tasks_input_field");
    let mainCont = document.body.querySelector("#task-list4");
    let cont1 = document.body.querySelector("#task-list")
    let cont2 = document.body.querySelector("#task-list2")
    let cont3 = document.body.querySelector("#task-list3")
    mainCont.style.display = "block";
    mainCont.innerHTML = "";
    div = Array.from(div);
    let arr = [];
    div.map((element,index)=>{
        //console.log(div[index].value);
        arr.push(div[index].value);
    })
    //console.log(arr);
    arr.sort();
    arr.map((element)=>{
        mainCont.innerHTML += '<div class="tasks">'
        mainCont.innerHTML += `<input value='${element}' type="text" readonly class="form-control tasks_input_field active" aria-describedby="emailHelp">`
        mainCont.innerHTML += '</div>'
    })

    cont1.style.display = "none";
    cont2.style.display = "none";
    cont3.style.display = "none";
    
}