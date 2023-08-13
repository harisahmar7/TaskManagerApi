const  dbConnector= require('../config/dbSetting');
const pgInteractor = dbConnector.dbConnection()

module.exports = {

	saveTask(taskName, isActive){
	 	return pgInteractor.query(`insert into task_manager(task_name, is_active) values($1, $2) ON conflict(task_name) do update set task_name= excluded.task_name, is_active = excluded.is_active, updated_date = now() returning id, task_name, is_active, created_date, updated_date`,[taskName, isActive]);
	},

	getTaskById(id){
		return pgInteractor.query(`select * from task_manager where id=$1`,[id]);
	},

	getAllTask(){
		return pgInteractor.query(`select * from task_manager`);
	},

	updateTask(taskName, isActive, taskId){
		return pgInteractor.query(`update task_manager set task_name = $1, is_active = $2, updated_date = now() where id= $3 returning id, is_active, task_name`,[taskName, isActive, taskId])
	},

	deleteTask(taskId){
		return pgInteractor.query(`delete from task_manager where id=$1 returning id`,[taskId]);
	}
}