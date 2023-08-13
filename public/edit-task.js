const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const task = await axios.get(`/api/v1/tasks?id=${id}`)
    const newTask = task.data.apiResponse[0];
    const { id: taskID, is_active, task_name } = newTask

    taskIDDOM.textContent = taskID
    taskNameDOM.value = task_name
    tempName = task_name
    if (is_active) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const task_Name = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const apiData= await axios.post(`/api/v1/createtask`, {
      taskName: task_Name,
      isActive: taskCompleted,
      taskId: id
    })
    const task = apiData.data;
    const { id: taskID, is_active, task_name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = task_Name
    tempName = task_Name
    if (is_active) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
