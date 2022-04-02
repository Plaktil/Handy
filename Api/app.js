/******************Imports******************/
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


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

const Note = mongoose.model("Notes", noteSchema);

const itemSchema = {
    content: String
};

const Item = mongoose.model("Items", itemSchema);

const checklistSchema = {
    title: String,
    items: [itemSchema]
}

const Checklist = mongoose.model("Checklists", checklistSchema);

//TODO: Add users to the mix. Each user needs to authenticate in order to access their own checklists and notes.
// needs .env, sessions, passport, passport-local, passport-local-mongoose

/******************Routing******************/

app.route("/notes")
.get(function(req, res) {
    Note.find({}, function(err, docs) { // Returns all the notes in the db
        if (err) {
            res.send(err); //Client side will need to handle errors
        } else {
            res.send(docs); //Client side receives a list of js objects
        }
    })
})
.post(function(req, res) {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    newNote.save(function(err, updatedDoc) {
        if (err) {
            res.send(err);
        } else {
            res.send(updatedDoc); // Will be used to reference the object in React
        }
    });
})
.delete(function(req, res) {
    Note.findByIdAndDelete(req.body.id, (err, updatedDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(updatedDoc);
        }
    });
});


app.route("/checklists")
.get((req, res) => {
    Checklist.find({}, (err, docs) => {
        if (err) {
            res.send(err);
        } else {
            res.send(docs);
        }
    });
})
.post((req, res) => {
    Checklist.findOne({title: req.body.title}, (err, doc) => {
        if (err) {
            res.send(err);
        } else {
            if (!doc) { // If the checklist doesn't exist in the DB (user just created it)
                doc = new Checklist({ // We create a new one and pass it on as doc
                    title: req.body.title,
                    items: []
                });
            }
            const newItem = new Item({
                content: req.body.content
            });

            doc.items.push(newItem); // This either updates the found doc or inserts the newly created doc.
            doc.save((err, updatedDoc) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(updatedDoc); // And returns the whole checklist 
                }
            });
        }
    });
})
.delete((req, res) => {
    Checklist.findById(req.body.listId, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            doc.items.pull(req.body.itemId) // Might need to implement automatic cleanup of empty checklists.
            doc.save(function(err, updatedDoc) { // Or maybe leave it to the user to delete their lists.
                if (err) {
                    res.send(err);
                } else {
                    res.send(updatedDoc);
                }
            });
        }
    });
});

// TODO: Implement parameters in routes for individual checklists.


/******************Listener******************/
let port = process.env.PORT;
if(port === null) {
    port = 9000;
}
app.listen(port, () => {
    console.log("Listening on port 9000...");
})