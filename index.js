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

// const httpServer = require("http").createServer(app);
// const options = { cors: {
//     origin: "http://localhost:3000",
//     credentials: true
//   } };

// const readStream = fs.createReadStream("./config.json");
// const io = require("socket.io")(httpServer, options);


// io.on("connection", socket => {
//     let pipeStream = function(data) {
//         setInterval(()=>{
//             socket.emit('data',JSON.parse(re));
//         },3000)
//     };
//     readStream.on('open',pipeStream);
//     socket.on('disconnect', function() {
//         readStream.removeListener('data', pipeStream);
//     });
// });


app.listen(port, () => console.log(`Listening on port ${port}`));