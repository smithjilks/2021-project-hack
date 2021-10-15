const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const mongoose = require('mongoose');

const tagsRoutes = require('./routes/tag')
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');

const app = express();


mongoose.connect("mongodb+srv://smith:" + process.env.MONGO_ATLAS_PW + "@cluster0.waguk.mongodb.net/access-contol?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true } )
.then( () =>{
  console.log("Connected to Database");
})
.catch(()=>{
  console.log('Connection failed');
});
 
//body-parser is depracated. Consider changing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");

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