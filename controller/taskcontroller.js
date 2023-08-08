const pgInteractor = require('../config/dbSetting');

module.exports ={

    getTask(req,res){
        let id = req.query.id;
        res.send(id);
    },

    createTask(req, res){
        res.send(req.body)
    }
}