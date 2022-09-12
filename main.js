const taskInput = document.querySelector('.taskInput'),
    saveBtn = document.querySelector('.saveBtn'),
    selectPriority = document.querySelector('.selectPriority'),
    taskResponsible = document.querySelector('.selectMember'),
    taskList = document.querySelector('.taskList');
let taskCount = taskList.childElementCount,
    tasks = [];

const renderItems = () => {
    taskList.textContent = '';

    tasks.forEach((item) => {
        const stringWrap = createTaskElement(item)

        taskList.append(stringWrap)
    })

}

const removeTask = (elem) => {
    tasks = tasks.filter(task => task.name !== elem)
    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    renderItems();
}

const createTaskElement = (item) => {
    const taskListWrapper = document.createElement('div'),
        line = document.createElement('div'),
        taskElement = document.createElement('div'),
        nameTask = document.createElement('div'),
        nameResponsible = document.createElement('div'),
        levelPriority = document.createElement('div'),
        deleteBtn = document.createElement('button'),
        taskElementBtns = document.createElement('div'),
        checkBtn = document.createElement('button');

    taskElementBtns.classList.add('taskElementBtns')
    taskListWrapper.classList.add('taskListWrapper')
    deleteBtn.classList.add('deleteBtn')
    checkBtn.classList.add('checkBtn')
    taskElement.classList.add('taskElement')
    line.classList.add('line')
    nameTask.classList.add('nameTask')
    levelPriority.classList.add('levelPriority')
    nameResponsible.classList.add('nameResponsible')

    nameTask.textContent = item.name
    nameResponsible.textContent = item.responsible

    levelPriority.textContent = item.priority
    let priority = levelPriority.textContent
    levelPriority.classList.add(`priority${priority}`)


    deleteBtn.addEventListener('click', () => {
        removeTask(item.name)
    })
    taskListWrapper.append(nameTask)
    taskListWrapper.append(nameResponsible)
    taskListWrapper.append(levelPriority)

    taskElementBtns.append(checkBtn)
    taskElementBtns.append(deleteBtn)

    taskListWrapper.append(taskElementBtns)

    taskElement.append(taskListWrapper)
    taskElement.append(line)
    return taskElement
}

const addTask = () => {
    if (!tasks.find((elem) => elem.name === taskInput.value) && taskInput.value !== '') {
        tasks.push({
            name: taskInput.value,
            responsible: taskResponsible.value,
            priority: selectPriority.value,
        })
        localStorage.setItem('tasksStorage', JSON.stringify(tasks))
        renderItems()
        taskInput.value = ''
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasksStorage')) {
        tasks = JSON.parse(localStorage.getItem('tasksStorage'))
        renderItems()
    }

    saveBtn.addEventListener("click", addTask)
    taskInput.addEventListener('keydown', (event) => {
        if (event.code == 'Enter') {
            addTask()
        }
    });
})