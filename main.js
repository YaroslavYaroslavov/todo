const taskInput = document.querySelector('.taskInput'),
    saveBtn = document.querySelector('.saveBtn'),
    selectPriority = document.querySelector('.selectPriority'),
    taskResponsible = document.querySelector('.selectMember'),
    taskList = document.querySelector('.taskList'),
    taskDoneList = document.querySelector('.taskDoneList');
let taskCount = taskList.childElementCount,
    tasks = [],
    doneTasks = [],
    renderedTasks = Array.from(document.querySelectorAll('.nameTask'));


const isRender = (item) => renderedTasks.find(elem => elem.textContent === item.name)

const renderItems = () => {
    tasks.forEach((item) => {
        if (isRender(item)) {
            return
        }
        taskList.append(createTaskElement(item))
        renderedTasks = Array.from(document.querySelectorAll('.nameTask'));
    })
    doneTasks.forEach((item) => {
        if (isRender(item)) {
            return
        } else {
            const taskElement = createTaskElement(item)
            taskDoneList.append(taskElement)
            renderedTasks = Array.from(document.querySelectorAll('.nameTask'));
        }
    })

}


const findTodo = (el) => renderedTasks.find(elem => elem.textContent === el.name).parentNode.parentNode


const removeTask = (elem) => {
    findTodo(elem).remove()
    tasks = tasks.filter(task => task.name !== elem.name)
    doneTasks = doneTasks.filter(doneTask => doneTask.name !== elem.name)

    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    localStorage.setItem('doneTasksStorage', JSON.stringify(doneTasks))
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
        removeTask(item)
    })
    checkBtn.addEventListener('click', () => {
        checkTask(item)
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
    if (!tasks.find((elem) => elem.name === taskInput.value) && taskInput.value !== '' && !doneTasks.find((elem) => elem.name === taskInput.value)) {
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

const checkTask = (elem) => {
    doneTasks.push(elem)

    tasks = tasks.filter(task => task.name !== elem.name)
    taskDoneList.append(findTodo(elem))
    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    localStorage.setItem('doneTasksStorage', JSON.stringify(doneTasks))

}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasksStorage')) {
        tasks = JSON.parse(localStorage.getItem('tasksStorage'))
        renderItems()
    }
    if (localStorage.getItem('doneTasksStorage')) {
        doneTasks = JSON.parse(localStorage.getItem('doneTasksStorage'))
        renderItems()
    }

    saveBtn.addEventListener("click", addTask)
    taskInput.addEventListener('keydown', (event) => {
        if (event.code == 'Enter') {
            addTask()
        }
    });
})