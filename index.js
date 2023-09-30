// Define UI Elements 
let input = document.getElementById("input_task")
let add = document.getElementById("add_task")
let taskList = document.getElementById("task_list")
let X;
let clearList = document.getElementById('clear_task')
let filter = document.getElementById('filter_task')



// addTask
const addTask = (e) => {
    if(input.value === ""){
        alert("Please Add Task")
    }
    else{
        inLocalStorage(input.value)
        let newTask = document.createElement("li")
        newTask.textContent = input.value + " "
        taskList.append(newTask) 
        input.value = ""
        //
        
        X = document.createElement('a')
        X.setAttribute('href', '#')
        X.innerHTML = 'x'
        newTask.append(X) 
        //
        
    }
}
add.addEventListener("click", addTask)

// Remove Task
const removeTask = (e) =>{
    // console.log(e.target);
    if (e.target.hasAttribute('href')) {
        
            let ele = e.target.parentElement;
            // console.log(ele);
            ele.remove()

            removeFromLS (ele)
    }
}

taskList.addEventListener("click", removeTask)

// Clear Tasks 
const clearTask = () =>{
    if(confirm("Are You Sure??")){
        taskList.innerHTML = " "
    }
    localStorage.clear()
}
clearList.addEventListener('click', clearTask)

//Filter Task 
const filterTask = (e) => {
    let text = e.target.value

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent

        if (item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none'
        }
    })
}

filter.addEventListener('keyup', filterTask)



// Set Local storage 
const inLocalStorage = (task) => {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log(task);
}


// set item after refresh 
const getTask = () => {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(task => {
        let newTask = document.createElement("li")
        newTask.textContent = task + " "
        taskList.append(newTask) 
        input.value = ""
        //
        
        X = document.createElement('a')
        X.setAttribute('href', '#')
        X.innerHTML = 'x'
        newTask.append(X) 
    })
} 

document.addEventListener('DOMContentLoaded', getTask)

// function remove from localStorage 
const removeFromLS = (taskItem) => {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    let li = taskItem
    li.removeChild(li.lastChild)

    tasks.forEach((task, index) =>{
        if (li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}