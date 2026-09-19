// task list
const tasks = [
    {
        id: 1,
        title: 'Task 1',
        notes: 'This is the first task.',
        deadline: '2026-09-19',
        status: 'completed'
    },
    {
        id: 2,
        title: 'Task 2',
        notes: 'This is the second task.',
        deadline: '2026-09-20',
        status: 'in-progress'
    },{
        id: 3,
        title: 'Task 3',
        notes: 'This is the third task.',
        deadline: '2026-09-21',
        status: 'not-started'
    },{
        id: 4,
        title: 'Task 4',
        notes: 'This is the forth task.',
        deadline: '2026-09-22',
        status: 'not-started'
    },
]

// checkbox for task list
document.querySelectorAll('.task-check').forEach((checkbox) => {

    checkbox.addEventListener('change', () => {
        const currentTask = tasks.find(t => t.id === task.id)

        if(checkbox.checked){
            currentTask.prevStatus = currentTask.status 
            currentTask.status = 'completed'
        }else{
            currentTask.status = currentTask.prevStatus || 'not-started'
        }
        label.classList.toggle('task-done', checkbox.checked)
        label.classList.toggle('task-in-progress', currentTask.status) 
    })
})



// show & update task details
let selectedTaskId = 1
const detailPanel = document.querySelector('.task-details')
const detailTitle = detailPanel.querySelector('input[name="task-title"]')
const detailDescription = detailPanel.querySelector('textarea[name="task-description"]')
const detailStatus = detailPanel.querySelector('select[name="task-status"]')
const detailDeadline = detailPanel.querySelector('input[name="task-deadline"]')

function renderTaskList() {
    const taskList = document.querySelector('.task-section')
    taskList.innerHTML = ''

    tasks.forEach((task) => {
        const li = document.createElement('li')
        li.className = 'task-text'
        li.dataset.id = task.id 
        
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'task-check'
        if(task.status === 'completed'){
            checkbox.checked = 1
        } 
        
        const label = document.createElement('span')
        label.className = 'task-label'
        label.textContent = task.title
        
        if(task.status === 'completed'){
            label.classList.add('task-done')
        }else if(task.status === 'in-progress') {
            label.classList.add('task-in-progress')
        }

        checkbox.addEventListener('change', () => {
            const currentTask = tasks.find(t => t.id === task.id)
            
            if(checkbox.checked) {
                currentTask.prevStatus = currentTask.status 
                currentTask.status = 'completed'
            }else {
                if(currentTask.prevStatus) {
                    currentTask.status = currentTask.prevStatus
                }else {
                    currentTask.status = currentTask.status
                }
            }

            detailStatus.value = currentTask.status

            if(currentTask.status === 'completed') {
                label.classList.add('task-done')
                label.classList.remove('task-in-progress')
            }else if(currentTask.status === 'in-progress') {
                label.classList.remove('task-done')
                label.classList.add('task-in-progress')
            }else {
                label.classList.remove('task-done')
                label.classList.remove('task-in-progress')
            }
        })

        li.addEventListener('click', () => {
            selectedTaskId = task.id 
            
            detailTitle.value = task.title 
            detailDescription.value = task.notes
            detailStatus.value = task.status
            detailDeadline.value = task.deadline
        })
        li.appendChild(checkbox)
        li.appendChild(label)
        taskList.appendChild(li)
    })
}

renderTaskList()

document.querySelector('.details-button').addEventListener('click', () => {
    const task = tasks.find(t => t.id === selectedTaskId)
    if(!task) return 

    task.title = detailTitle.value.trim()
    task.description = detailDescription.value.trim()
    task.status = detailStatus.value
    task.deadline = detailDeadline.value

    renderTaskList()
})

// add task list
const addTaskForm = document.querySelector('.task-form')
const taskList = document.querySelector('.task-section')

addTaskForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const titleInput = addTaskForm.querySelector('input[name="task-title"]')
    const descInput = addTaskForm.querySelector('textarea[name="task-description"]')
    const deadlineInput = addTaskForm.querySelector('input[name="task-deadline"]')

    const title = titleInput.value.trim()
    const description = descInput.value.trim()
    const deadline = deadlineInput.value

    if(!title) {
        alert('Please enter a task title')
        return 
    }

    const newTask = {
        id: Date.now(),
        title, 
        notes: description,
        deadline,
        status: 'not-started'
    }

    tasks.push(newTask)
    renderTaskList()
    addTaskForm.reset()  
})