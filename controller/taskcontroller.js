const taskModel = require('../model/taskmodel');
const regularSetting = require(`../config/regular_settings`)

module.exports = {

  getTask(req, res) {
    let id = req.query.id;
    if(id){
        taskModel.getTaskById(id).then((taskData)=>{
            if(taskData.rows.length){

            taskData.rows[0].created_date = regularSetting.getMoment(new Date(taskData.rows[0].created_date)).format('LLL');
            taskData.rows[0].updated_date = regularSetting.getMoment(new Date(taskData.rows[0].updated_date)).format('LLL');

            res.send({
                msg : "1",
                apiResponse: taskData.rows
            })    
        }else{
            res.send({
                msg : "-1",
                apiResponse: `No task with id: ${id}`
            })
        }
            
        })
        
    }else{
        taskModel.getAllTask().then((taskData)=>{
            for(let index of taskData.rows){
                index.created_date = regularSetting.getMoment(new Date(index.created_date)).format('LLL');
                index.updated_date = regularSetting.getMoment(new Date(index.updated_date)).format('LLL');
            }
            res.send({
                msg : "1",
                apiResponse: taskData.rows
            })
        })
    }
  },

  createTask(req, res) {
    const taskName = req.body.taskName;
    const isActive = req.body.isActive ? req.body.isActive : false;
    const taskId = req.body.taskId;
    if(!req.body.taskId){
    if (req.body.taskName) {
      taskModel.saveTask(taskName, isActive).then((result) => {
        res.send({
          msg: "1",
          id: result.rows[0].id,
          completed: result.rows[0].is_active,
          taskName: result.rows[0].task_name,
          apiResponse: "Task Sucessfully Created"
        })
      })
    } else {
      res.send({
        msg: "-1",
        apiResponse: "Please Enter Task Name"
      })
    }    
    }else{
      taskModel.updateTask(taskName,isActive, taskId).then((updateResult)=>{
        updateResult = updateResult.rows ? updateResult.rows: [];
        res.send({
            msg: "1",
            id: updateResult[0].id,
            completed: updateResult[0].is_active,
            taskName: updateResult[0].task_name,
            apiResponse: "Task Updated Sucessfully"
        })

      })
    }
    
  },

  deleteTask(req, res){
    const taskId = req.query.taskId;
    if(req.query.taskId){
        taskModel.deleteTask(taskId).then((deletedTask)=>{
            deletedTask = deletedTask.rows ? deletedTask.rows : [];
            if(deletedTask.length){
            res.send({
                msg: "1",
                id: taskId,
                apiResponse: `Task Deleted Sucessfully: ${taskId}`
            })    
            }else{
                res.send({
                    msg: "-1",
                    apiResponse: `No TaskId Found:${taskId}`
                })
           }
            
        })
    }else{
        res.send({
            msg: "-1",
            apiResponse: "Please Enter Task ID"
        })
    }
  }
}