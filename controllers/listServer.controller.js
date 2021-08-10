const db = require('../db');

module.exports.get = (req,res,next)=>{
    res.json(db.get("List_SV").value());
}

module.exports.post = (req,res,next)=>{
    res.json(db.get("List_SV").value());
}