const addBtn = document.getElementById('add-btn')
const form = document.getElementById('form')
const taskInput = document.getElementById('task-input')
const taskContainer = document.getElementById('task-container')

let getLocalStorage =  JSON.parse(localStorage.getItem('taskList')) 
let taskList = localStorage.getItem('taskList') !== null ? getLocalStorage : []


let generateRandomID = ()=> Math.floor(Math.random()*10000)

function updatingDom(){
    taskContainer.innerHTML=``
    updateLocalStorage()
    taskList.forEach(elm => addingTaskToDOM(elm))
}

function removeTask(elm){
    taskList = taskList.filter(index => index.id !== elm)
    updateLocalStorage()
    updatingDom()
}

function addingTaskToDOM(elm){
    let list = document.createElement('li')
    list.classList.add('task')
    list.innerHTML=`<input type="text" value="${elm.task}" id ="${elm.id}" disabled = "disabled">
     <button onclick='editTask(${elm.id})'>Edit</button> 
     <i class="fas fa-trash-alt" onclick='removeTask(${elm.id})'></i>`
    taskContainer.appendChild(list)
}


function editTask(elm){
    let liInput = document.getElementById(elm)
    if(liInput.hasAttribute('disabled')){
        liInput.removeAttribute('disabled')
    }else{
        liInput.setAttribute("disabled", "disabled")
    }
    let editIndex = taskList.findIndex(item => item.id === elm)
    taskList[editIndex].task = liInput.value
    updateLocalStorage()
}


function updateLocalStorage(){
    localStorage.setItem('taskList',JSON.stringify(taskList))
}

function creatingTask(e){
    e.preventDefault()
    if(taskInput.value === ''){
        alert('Please enter a task')
    }else{
        let taskElm = {
            id: generateRandomID(),
            task: taskInput.value
        }
        taskList.push(taskElm)
        updateLocalStorage()
        addingTaskToDOM(taskElm)
        taskInput.value= ''
    }
}

form.addEventListener('submit',creatingTask)
updatingDom()
