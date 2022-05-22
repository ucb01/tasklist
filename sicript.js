const taskForm = document.querySelector('.task-form')
const taskInput = document.querySelector('.task-input')
const taskList = document.querySelector('.task-list')

let tasks = []

taskForm.addEventListener('submit',function (event){
    event.preventDefault()
    addNewTask(taskInput.value.trim().toLocaleLowerCase() )
})

getFromLS()

taskList.addEventListener('click',function(event){
    //console.log(event.target);
    if(event.target.classList.contains("fa-check-square")){
        completeTask(event.target.parentElement.getAttribute("data-id"))
    }

    if(event.target.classList.contains("fa-trash-alt")){
        deleteTask(event.target.parentElement.getAttribute("data-id"))
    }

})



function addNewTask(item){
    if(item){
        const newTask = {
            id: Date.now(),
            name: item,
            completed: false
        }
        tasks.push(newTask)
        addToLS(tasks)
        taskInput.value = ""
    }
}

function addToLS(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks))
    showTasks(tasks)
}

function showTasks(tasks){
    taskList.innerHTML = ""
    tasks.forEach(function(task){
        const checked = task.completed ? "checked" : null;

        const li = document.createElement('li')
        li.setAttribute("class","item")
        li.setAttribute("data-id", task.id)

        if(task.completed === true){
            li.classList.add("checked")
        }
        li.innerHTML = `
        ${task.name}
        <i class="far fa-trash-alt"></i>
            <i class="far fa-check-square ${checked}"></i>
        
        `
        taskList.append(li)
    })
}

function getFromLS(){
    const localTasks = localStorage.getItem("tasks")
    if(localTasks){
        tasks = JSON.parse(localTasks)

        showTasks(tasks)
    }
}

function completeTask(id){

    tasks.forEach(function(task){
        if(task.id==id){
            task.completed = !task.completed
        }
    })

    addToLS(tasks)
}

function deleteTask(id){
    tasks=tasks.filter(function(task){
        return task.id !=id
    })

    addToLS(tasks)
}