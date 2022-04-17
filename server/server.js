/******************Imports******************/
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


/******************Setup******************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/handyDB", {useNewUrlParser: true});
mongoose.pluralize(null);


/******************Mongo Setup******************/
const noteSchema = {
    title: String,
    content: String
};

const Note = mongoose.model("Notes", noteSchema);

const itemSchema = {
    content: String,
    checked: Boolean
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

// TODO: Add confirmation codes to each of the responses so that the client may handle a bad request
// appropriately.

app.route("/notes")
.get(function(req, res) {
    Note.find({}, function(err, docs) { // Returns all the notes in the db
        if (err) {
            res.send(err); //Client side will need to handle errors
        } else {
            res.json(docs); //Client side receives a list of js objects
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
            res.json(updatedDoc); // _id will be used to reference the object in React
        }
    });
})
.delete(function(req, res) {
    Note.findByIdAndDelete(req.body.id, (err, updatedDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.json(updatedDoc);
        }
    });
});

// Acts on the items of checklists rather than on the checklists themselves. Although, it will create
// a new checklist if an item is added to a non-existing checklist.
app.route("/checklists")
.get((req, res) => {
    Checklist.find({}, (err, docs) => {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
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
                content: req.body.content,
                checked: req.body.checked
            });

            doc.items.push(newItem); // This either updates the found doc or inserts the newly created doc.
            doc.save((err, updatedDoc) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(updatedDoc); // And returns the whole checklist 
                }
            });
        }
    });
})
// .patch((req, res) => {
    /*
        Will mainly be used to set the "checked property" on checklist items.
        Should not return anything but a confirmation.
    */
// })
.delete((req, res) => {
    Checklist.findById(req.body.listId, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            doc.items.pull(req.body.itemId) // Remove the list Item
            doc.save(function(err, updatedDoc) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(updatedDoc); // Return the updated checklist
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