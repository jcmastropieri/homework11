const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json')
const path = require("path");
const fs = require('fs')

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//api routes that serve up data
app.get("/api/notes", (req,res)=>{
    res.json(db)
});

app.post("/api/notes", (req,res)=>{
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => err ? res.status(401).statusMessage(err) : res.json("success!"));
});

app.delete("/api/notes/:id", (req,res)=>{
    db.splice(req.params.id, 1);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => err ? res.status(401).statusMessage(err) : res.json("success!"));
});


//file routes that serve up html files
app.get("/notes", (req,res)=> res.sendFile(path.join(__dirname, "./public/notes.html")));
app.get("*", (req,res)=> res.sendFile(path.join(__dirname, "./public/index.html")));
app.listen(PORT, ()=> console.log('server is running on port ', PORT))

