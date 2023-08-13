# TASK MANAGER API

**To Run the Task Manager API please run below command on the terminal on root folder of the project.**

1.npm install [run on the terminal root foalder of the project to install npm[node package manager] packages].

2.setup database on postgres and create table based on give schema below.

3.setup .env on root foalder of the project based on given structure below.

3.node app.js [run on the terminal on root foalder of the project to run node application].

4.http://localhost:3000 [Run this URL on the browser to execute application]

 **Table Schema:**
 
 CREATE TABLE task_manager (
	id bigserial NOT NULL,
	task_name varchar NULL,
	updated_date timestamptz NULL,
	is_active bool NULL,
	created_date timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT task_manager_pkey PRIMARY KEY (id),
	CONSTRAINT unique_task_name UNIQUE (task_name)
);

**.ENV structure**

PG_USER_NAME= your database username
PG_PASSWORD= yout database password
PG_PORT= your database port
PG_HOST= your database host

 
