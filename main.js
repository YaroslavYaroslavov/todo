const taskInput = document.querySelector('.taskInput')
const saveBtn = document.querySelector('.saveBtn')
const selectPriority = document.querySelector('.selectPriority')
const taskResponsible = document.querySelector('.selectMember')
const taskList = document.querySelector('.taskList')
const taskDoneList = document.querySelector('.taskDoneList')
const oneSecond = 1000;
const oneHour = 3600000
const oneDay = 86400000;
const onePercent = 24


let taskCount = taskList.childElementCount
let tasks = []
let doneTasks = []
let renderedTasks = Array.from(document.querySelectorAll('.nameTask'))


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
            taskElement.classList.add('checked')
            taskDoneList.append(taskElement)
            renderedTasks = Array.from(document.querySelectorAll('.nameTask'));

        }
    })

}


const findElem = (el) => renderedTasks.find(elem => elem.textContent === el.name).parentNode.parentNode
const findTodo = (arr, item) => arr.find((elem) => elem.name === item)

const removeTask = (elem) => {
    findElem(elem).remove()
    tasks = tasks.filter(task => task.name !== elem.name)
    doneTasks = doneTasks.filter(doneTask => doneTask.name !== elem.name)

    localStorage.setItem('tasksStorage', JSON.stringify(tasks))
    localStorage.setItem('doneTasksStorage', JSON.stringify(doneTasks))
    renderedTasks = Array.from(document.querySelectorAll('.nameTask'))
}

const createTaskElement = (item) => {
    const taskListWrapper = document.createElement('div'),
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
    return taskElement
}

const addTask = () => {
    const existInTasks = findTodo(tasks, taskInput.value)
    const existInDoneTasks = findTodo(doneTasks, taskInput.value)

    if (taskInput.value !== '' && !existInTasks && !existInDoneTasks) {
        tasks.push({
            name: taskInput.value,
            responsible: taskResponsible.value,
            priority: selectPriority.value,
            timeToRemoveToDo: Date.now() + oneDay
        })
        localStorage.setItem('tasksStorage', JSON.stringify(tasks))
        renderItems()
        taskInput.value = ''
    }
}

const checkTask = (elem) => {
    const curElem = findElem(elem)
    if (!curElem.classList.contains('checked')) {
        doneTasks.push(elem)

        tasks = tasks.filter(task => task.name !== elem.name)

        curElem.classList.add('checked')

        taskDoneList.append(curElem)
        localStorage.setItem('tasksStorage', JSON.stringify(tasks))
        localStorage.setItem('doneTasksStorage', JSON.stringify(doneTasks))
    } else {
        elem.timeToRemoveToDo = Date.now() + oneDay
        tasks.push(elem)
        doneTasks = doneTasks.filter(doneTask => doneTask.name !== elem.name)
        curElem.classList.remove('checked')
        taskList.append(curElem)
        localStorage.setItem('tasksStorage', JSON.stringify(tasks))
        localStorage.setItem('doneTasksStorage', JSON.stringify(doneTasks))
    }



}

const changeOpacity = () => {
    doneTasks.forEach(obj => {
        const newOpacity = (obj.timeToRemoveToDo - Date.now()) / (oneHour / oneSecond) / oneSecond / onePercent;
        const currentElem = findElem(obj)
        if (newOpacity < 0.20) {
            removeTask(obj)
        } else {
            currentElem.style.opacity = `${newOpacity}`
        }
    });

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

    setInterval(changeOpacity, oneSecond)
})