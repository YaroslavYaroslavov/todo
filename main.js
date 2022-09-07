const taskInput = document.querySelector('.taskInput'),
    selectMember = document.querySelector('.selectMember'),
    saveBtn = document.querySelector('.saveBtn'),
    selectPriority = document.querySelector('.selectPriority'),
    taskResponsible = document.querySelector('.selectMember'),

    taskList = document.querySelector('.taskList');
let taskCount = taskList.childElementCount;
let tasks = []
if (localStorage.getItem('tasksStorage')) {
    console.log(localStorage.getItem('tasksStorage'))

    tasks = JSON.parse(localStorage.getItem('tasksStorage'))
    console.log(tasks)
    renderItems()
} else {
    console.log('q')
}



function removeTask(a) {
    tasks.splice(a, 1);
    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    renderItems();
}

function renderItems() {

    taskList.textContent = '';
    tasks.forEach((item) => {
        const taskListWrapper = document.createElement('div')
        const line = document.createElement('div')
        line.classList.add('line')


        const nameTask = document.createElement('div')
        nameTask.classList.add('nameTask')

        const nameResponsible = document.createElement('div')
        nameResponsible.classList.add('nameResponsible')
        const levelPriority = document.createElement('div')
        levelPriority.classList.add('levelPriority')
        const checkBtn = document.createElement('button')

        taskListWrapper.classList.add('taskListWrapper')



        checkBtn.classList.add('checkBtn')


        nameTask.textContent = item.name
        nameResponsible.textContent = item.responsible
        levelPriority.textContent = item.priority
        if (levelPriority.textContent === 'Low') {
            levelPriority.classList.add('priorityLow')
        }
        if (levelPriority.textContent === 'Medium') {
            levelPriority.classList.add('priorityMedium')
        }
        if (levelPriority.textContent === 'Hight') {
            levelPriority.classList.add('priorityHight')
        }

        taskListWrapper.append(nameTask)
        taskListWrapper.append(nameResponsible)
        taskListWrapper.append(levelPriority)
        taskListWrapper.append(checkBtn)

        taskList.append(taskListWrapper)
        taskList.append(line)
        taskCount = taskList.childElementCount - 1;
        taskListWrapper.id = `${taskCount}`
        checkBtn.addEventListener('click', () => removeTask(+taskListWrapper.id))

    })


}

function addTask() {
    if (tasks.find((elem) => elem.name === taskInput.value) || taskInput.value == "") {

    } else {
        tasks.push({
            name: taskInput.value,
            responsible: taskResponsible.value,
            priority: selectPriority.value,
        })
    }
    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    renderItems()
}
saveBtn.addEventListener("click", addTask)