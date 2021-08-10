const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

const listServerRouter = require('./routers/listServer.router');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use("/api/listServer",listServerRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));