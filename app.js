const express = require('express');
const app = express();
const port = 3000;
const taskController = require('./controller/taskcontroller');

app.use(express.json());
app.get('/api/v1/tasks',taskController.getTask);
app.post('/api/v1/createtask', taskController.createTask);




app.listen(port, ()=>{
    console.log(`Server is connected at port:${port}`);
})

