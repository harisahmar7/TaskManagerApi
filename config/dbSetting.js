const Pool = require('pg-pool');

const pool = new Pool({
    host:"localhost",
    port: 5432,
    user: "postgres",
    password:"admin"
})

pool.connect((err, result)=>{
    if(err){
        console.log(err)
    }
    console.log("Database is connected...!");
})



module.exports={pool}