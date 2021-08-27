const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ResourceServer', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});


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
    }, 5000);
    socket.on("disconnect",()=>{
        console.log("disconnected !");
    })
  })

const server = httpServer.listen(port, () => {
console.log('server is running on port', port);
});

// app.listen(port, () => console.log(`Listening on port ${port}`));