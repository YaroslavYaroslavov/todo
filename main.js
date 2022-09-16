const taskInput = document.querySelector('.taskInput'),
    saveBtn = document.querySelector('.saveBtn'),
    selectPriority = document.querySelector('.selectPriority'),
    taskResponsible = document.querySelector('.selectMember'),
    taskList = document.querySelector('.taskList'),
    taskDoneList = document.querySelector('.taskDoneList');
let taskCount = taskList.childElementCount,
    tasks = [],
    renderedTasksArray = [],
    doneTasks = [],
    renderedTasks = Array.from(document.querySelectorAll('.nameTask'));


const renderItems = () => {
    tasks.forEach((item) => {
        if (renderedTasks.find(elem => elem.textContent === item.name)) {
            return
        } else {
            const taskElement = createTaskElement(item)
            taskList.append(taskElement)
            renderedTasks = Array.from(document.querySelectorAll('.nameTask'));
        }
    })
}


const findElem = (el) => {
    return renderedTasks.find(elem => elem.textContent === el.name).parentNode.parentNode
}

const removeTask = (elem) => {
    findElem(elem).remove()
    tasks = tasks.filter(task => task.name !== elem.name)
    localStorage.setItem('tasksStorage', JSON.stringify(tasks))

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

const checkTask = (elem) => {
    doneTasks.push(elem)

    taskDoneList.append(findElem(elem))
        // removeTask(elem);

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