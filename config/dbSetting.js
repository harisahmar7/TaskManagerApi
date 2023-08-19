const Pool = require('pg-pool');
require('dotenv').config();

function dbConnection(){

    const pool = new Pool({
    host:process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER_NAME,
    password:process.env.PG_PASSWORD
})
    pool.connect((err, result)=>{
    if(err){
        console.log(err)
    }
})
    return pool;

}








module.exports={dbConnection}