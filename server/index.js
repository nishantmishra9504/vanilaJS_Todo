const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require("./models/TodoModel")
const cors = require('cors')
const port = 8080;

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect("mongodb+srv://admin:admin@cluster0.yzfjkg5.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("Database Connected"))
.catch((err)=>console.log(err));

//Add API 
app.post("/add",async function(req,res) {
    // console.log(req.body);
    let todo = new Todo(req.body);
    let result = await todo.save();
    res.status(200).json({message: "Data Added"});
});

//Show API
app.get("/show",async (req,res)=>{
    let data = await Todo.find();
    res.send(data);
})

//Update API

app.put("/update/:id",async (req,res)=>{
    let data = await Todo.findByIdAndUpdate({_id:req.params.id},
        {$set:req.body})
    res.status(200).json({message:"Data Updated"})
})

//Delete API
app.delete("/delete/:id", async(req,res)=>{
    let data = await Todo.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({message:"Data Deleted"})
})


app.listen(port,()=>{
    console.log("API Started");
})
