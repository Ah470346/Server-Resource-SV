const Server = require("../models/listServer.model");
const Model = require('../models/modelRun.model');

module.exports.get = (req,res,next)=>{
    Server.find().then((servers)=>{
        res.json(servers);
    })
}

module.exports.post = (req,res,next)=>{
    Server.create(req.body,(server)=>{
        res.send("Create server success");
    });
}

module.exports.put = (req,res,next)=>{
    console.log("hello");
    Server.findOneAndUpdate({name:req.params.name,Device:req.params.device},{...req.body}).then((result)=>{
        res.send("Edit is success");
    }).catch((error)=>{
        res.send(error);
    })
}

module.exports.delete = (req,res,next)=>{
    console.log(req.params.name,req.params.device);
    Server.findOneAndRemove({name:req.params.name,Device:req.params.device}).then(()=>{
        Model.deleteMany({Server_Run: req.params.name}).then(()=>{
            res.send(`Delete server ${req.params.name} is success`);
        })
    }).catch((error)=>{
        res.send(error);
    })

}

module.exports.updateUsage = (req,res,next)=>{
    Server.updateOne({name:req.params.name,Device:req.params.device},{U_GB: req.body.usage}).then(()=>{
        res.send(`Update usage of server ${req.params.name} is success`);
    }).catch((error)=>{
        res.send(error);
    })
}