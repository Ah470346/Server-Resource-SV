const Model = require("../models/modelRun.model");

module.exports.get = (req,res,next)=>{ 
    Model.find({Server_Run: req.params.server}).then((models)=> res.json(models));
}

module.exports.getAll = (req,res,next)=>{ 
    Model.find().then((models)=> {
        res.json(models);
    });
}

module.exports.post = (req,res,next)=>{
    Model.create(req.body,(model)=>{
        res.send("Create a model success");
    })
}

module.exports.put = (req,res,next)=>{
    Model.findOneAndUpdate({name:req.params.name},{...req.body}).then((result)=>{
        res.send("Edit is success");
    }).catch((error)=>{
        res.send(error);
    })
}

module.exports.delete = (req,res,next)=>{
    Model.findOneAndRemove({name:req.params.name}).then(()=>{
        res.send(`Delete Model ${req.params.name} is success`);
    }).catch((error)=>{
        res.send(error);
    })
}