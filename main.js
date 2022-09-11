const taskInput = document.querySelector('.taskInput'),
    selectMember = document.querySelector('.selectMember'),
    saveBtn = document.querySelector('.saveBtn'),
    selectPriority = document.querySelector('.selectPriority'),
    taskResponsible = document.querySelector('.selectMember'),

    taskList = document.querySelector('.taskList');
let taskCount = taskList.childElementCount;
let tasks = []

document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasksStorage'))
    renderItems()
})

const createTaskElement = (item) => {
    const taskListWrapper = document.createElement('div'),
        line = document.createElement('div'),
        stringWrap = document.createElement('div'),
        nameTask = document.createElement('div'),
        nameResponsible = document.createElement('div'),
        levelPriority = document.createElement('div'),
        checkBtn = document.createElement('button');
    let priority = levelPriority.textContent;

    taskListWrapper.classList.add('taskListWrapper')
    checkBtn.classList.add('checkBtn')
    stringWrap.classList.add('stringWrap')
    line.classList.add('line')
    nameTask.classList.add('nameTask')
    levelPriority.classList.add('levelPriority')
    nameResponsible.classList.add('nameResponsible')

    nameTask.textContent = item.name
    nameResponsible.textContent = item.responsible

    levelPriority.textContent = item.priority
    priority = levelPriority.textContent
    levelPriority.classList.add(`priority${priority}`)


    if (!taskList.childElementCount) {
        taskCount = 0;
    } else {
        taskCount = taskList.childElementCount
    }
    taskListWrapper.id = `${taskCount}`
    checkBtn.addEventListener('click', () => removeTask(Number(taskListWrapper.id)))
    taskListWrapper.append(nameTask)
    taskListWrapper.append(nameResponsible)
    taskListWrapper.append(levelPriority)
    taskListWrapper.append(checkBtn)

    stringWrap.append(taskListWrapper)
    stringWrap.append(line)
    return stringWrap
}


const removeTask = (numberTask) => {
    tasks.splice(numberTask, 1);
    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    renderItems();


}

const renderItems = () => {
    taskList.textContent = ''; // бля не бей я в процессе


    tasks.forEach((item) => {

        let stringWrap = createTaskElement(item)

        taskList.append(stringWrap)


    })
}

const addTask = () => {
    if (tasks.find((elem) => elem.name === taskInput.value) || !taskInput.value) {

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