const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const mongoose = require('mongoose');

const tagsRoutes = require('./routes/tag')
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');

const app = express();


mongoose.connect("mongodb+srv://smith:" + process.env.MONGO_ATLAS_PW + "@cluster0.ptmmu.mongodb.net/node-angular?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true } )
.then( () =>{
  console.log("Connected to Database");
})
.catch(()=>{
  console.log('Connection failed');
});

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//granting access to the images folder
app.use("/images", express.static(path.join(__dirname, "images")));

//set headers to disablle CORS error that is triggered bb default
//CORS - Cross Origin Resource Error

app.use((req, res, next) => {

  //Allows domains to access resources
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");

  //Restrict to domains sending request with a set of particular headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/v1/api/tags", tagsRoutes);
app.use("/v1/api/students", studentRoutes);
app.use("/v1/api/users", userRoutes);

module.exports = app;