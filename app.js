const express = require('express');
const app = express();
const port = 3000;
const taskController = require('./controller/taskcontroller');
const dbConnector = require('./config/dbSetting');
const morgan = require('morgan');

//Declaring middleware
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));


function middleWare(req, res, next){
  if(Object.keys(req.body).length){
  console.log("POST REQUEST------------->",req.body);  
  }

  if(Object.keys(req.query).length){
   console.log("GET REQUEST------------->",req.query); 
  }

  next();
}

app.use(middleWare);

//Declaring routes
app.get('/api/v1/tasks', taskController.getTask);
app.get('/api/v1/deletetask', taskController.deleteTask);
app.post('/api/v1/createtask', taskController.createTask);


//starting server with db connection
const start = async () => {
  try {
    await dbConnector.dbConnection();
    app.listen(port, () => {
      console.log(`Server is connected at port:${port}`);
    })
  } catch (err) {
    console.log(error);
  }
}
start(); //Starting server with DB connection