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
        const stringWrap = document.createElement('div')
        stringWrap.classList.add('stringWrap')
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
        const priority = levelPriority.textContent
        levelPriority.classList.add(`priority${priority}`)

        taskListWrapper.append(nameTask)
        taskListWrapper.append(nameResponsible)
        taskListWrapper.append(levelPriority)
        taskListWrapper.append(checkBtn)
            // taskListWrapper.append(line)
        stringWrap.append(taskListWrapper)
        stringWrap.append(line)
        taskList.append(stringWrap)

        taskCount = taskList.childElementCount - 1;
        taskListWrapper.id = `${taskCount}`
        checkBtn.addEventListener('click', () => removeTask(Number(taskListWrapper.id)))

    })


}

function addTask() {
    if (tasks.find((elem) => elem.name === taskInput.value) || taskInput.value === "") {

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