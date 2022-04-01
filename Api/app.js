/******************Imports******************/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlencoded = require("body-parser/lib/types/urlencoded");


/******************Setup******************/
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/handyDB", {useNewUrlParser: true});
mongoose.pluralize(null);


/******************Mongo Setup******************/
const noteSchema = {
    title: String,
    content: String
};

const Note = new mongoose.model("Notes", noteSchema);

const itemSchema = {
    content: String
};

const Item = new mongoose.model("Items", itemSchema);

const checklistSchema = {
    title: String,
    items: [itemSchema]
}

const Checklist = new mongoose.model("Checklists", checklistSchema);

//TODO: Add users to the mix. Each user needs to authenticate in order to access their own checklists and notes.
// needs .env, sessions, passport, passport-local, passport-local-mongoose

/******************Routing******************/

app.route("/notes")
.get(function(req, res) {
    Note.find({}, function(err, docs) {
        if (err) {
            res.send(err); //Client side will need to handle errors
        } else {
            res.send(docs); //Client side receives a list of js objects
        }
    })
})
.post(function(req, res) {
    const newNote = new Note({
        title: req.params.title,
        content: req.params.content
    });

    newNote.save(function(err) {
        if (err) {
            res.send(err); //Client side will need to handle errors
        } else {
            res.send(true); //Client side receives a confirmation
        }
    });
})
.delete(); //<------------ Continue here

let port = process.env.port;
if(port === null) {
    port = 9000;
}
app.listen(port, function() {
    console.log("Listening on port 9000...");
})