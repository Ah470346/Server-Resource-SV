const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const ping = require('ping');
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.134:27017/ResourceServer', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});


const app = express();
const port = 8080;

const listServerRouter = require('./routers/listServer.router');
const authRouter = require('./routers/auth.router');
const statusRouter = require('./routers/status.router');
const modelRouter = require('./routers/modelRun.router');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/listServer",listServerRouter);
app.use("/api/auth",authRouter);
app.use("/api/status",statusRouter);
app.use("/api/model",modelRouter);

//---------------------socket.io

const httpServer = require("http").createServer(app);
const Model = require('./models/modelRun.model');
const Server = require('./models/listServer.model');

var cfg = {
  timeout:1,
  // WARNING: -i 2 may not work in other platform like windows
  extra: ['-i', '2'],
};

const convertModel = (i,server) =>{
  if(i.number_run === 3){
      for(let j of server){
          if((j.GB - j.U_GB) >= i.GB_Model && i.Server_Run !== j.name && j.Status ===0 
          || (j.GB - j.U_GB) >= i.GB_Model && i.Server_Run === j.name && j.Device !== i.Device && j.Status === 0){
              return {newServer: j.name,newDevice:j.Device,newUsage:j.U_GB};
          }
      }
  }
  return "";
}

const updateNumberRun = (i) => {
  const currentDate = new Date();
  const date = new Date(i.time_run);
  if(((currentDate-date)/1000 >= 60 && i.number_run !== 3)){
      return true;
  }
  return false;
}

setInterval(() => {
  Server.find({$or:[{Status: 0},{Status:2}]},"name Status Device").then((server)=>{
    const hosts = server.map((i)=> {return {name:i.name,status:i.Status,device: i.Device}});
    hosts.forEach(function(host){
      ping.sys.probe(host.name, function(isAlive){
          var msg = isAlive ? 'host ' + host.name + ' is alive' : 'host ' + host.name + ' is dead';
          // console.log(msg);
          if(isAlive === false && host.status === 0){
            console.log('s');
            Server.findOneAndUpdate({name:host.name,Device: host.device},{Status:2}).then((asd)=>{});
          } else if(isAlive === true && host.status === 2){
            console.log('v');
            Server.findOneAndUpdate({name:host.name,Device: host.device},{Status:0}).then((asd)=>{});
          }
      },cfg);
    });
    // console.log("-------------------------------");
  });
  Model.find({}).then(async (result)=>{
    const listSV = await Server.find();
    for(let i of result){
      if(updateNumberRun(i)){
        await Model.findOneAndUpdate({name: i.name},{number_run: 3});
      }
      if(convertModel(i,listSV) !== ""){
        const date = new Date();
        const arr = date.toLocaleDateString().split("/");
        const old = listSV.filter((j)=>{return i.Server_Run===j.name&&i.Device === j.Device});
        const model = {old:{oldServer:i.Server_Run,oldDevice:i.Device,
          oldUsage: old[0].U_GB},
          new:convertModel(i,listSV),usage: i.GB_Model,name: i.name};
        const a =  await Server.findOneAndUpdate({name:model.old.oldServer,Device: model.old.oldDevice},{U_GB:(model.old.oldUsage - model.usage)});
        console.log(a);
        const b =  await Server.findOneAndUpdate({name:model.new.newServer,Device: model.new.newDevice},{U_GB: (model.new.newUsage + model.usage)});
        console.log(b);
        await Model.findOneAndUpdate({name:model.name}
          ,{Server_Run: model.new.newServer,Device: model.new.newDevice,number_run: 0, time_run:`${arr[2]}-${("0"+arr[0]).slice(-2)}-${("0"+arr[1]).slice(-2)} `
          + `${("0"+date.getHours().toString()).slice(-2)}:${("0"+date.getMinutes().toString()).slice(-2)}`
          + `:${("0"+date.getSeconds().toString()).slice(-2)}.${("0"+date.getMilliseconds().toString()).slice(-2)}`});
        
      }
    }
  })
}, 10000);


const options = { cors: {
    origin: "http://localhost:3000",
    credentials: true
} };
const io = require('socket.io')(httpServer,options);
  
  app.get('/', (req, res) => {
    res.send({ response: "a user is connected" }).status(200);
  })

  io.on('connection', (socket) =>{
    console.log("connection");
    setInterval(() => {
        Model.find().then((model)=>{
            socket.emit("model",model);
        })
    }, 2000);
    socket.on("disconnect",()=>{
        console.log("disconnected !");
    });
  })

const server = httpServer.listen(port, () => {
console.log('server is running on port', port);
});

// app.listen(port, () => console.log(`Listening on port ${port}`));