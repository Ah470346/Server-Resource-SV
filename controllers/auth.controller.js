const User = require('../models/auth.model');

module.exports.postAuth = (req,res,next) =>{
    User.find().then((users)=>{
        for(let i of users){
            if(i.username === req.body.username && i.password === req.body.password){
                res.status(200).send("login success");
                return;
            }
        } 
        res.status(401).send("username or password is wrong!!!");
    })
}