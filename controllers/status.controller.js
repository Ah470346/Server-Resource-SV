const Infor = require('../models/status.model');

module.exports.get = (req,res,next)=>{
    Infor.find().then((status)=> res.json(status[0]));
}

module.exports.post = (req,res,next)=>{
    Infor.updateOne({status:req.body.status===1 ? 0 : 1},{status:req.body.status}).then(()=>{
        res.send("update status done");
    });
}