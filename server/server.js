var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new Db('tutor', new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {}));

// var notes_init = [
//     {text: "First note"},
//     {text: "Second note"},
//     {text: "Third note"}
// ];

app.use(express.static(path.join(__dirname, '..')));

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.listen(8080);

// app.get("/notes", function(req,res) {
//     console.log("reading notes", req.session.notes);
//     if (!req.session.notes) {
//         req.session.notes = notes_init;
//     }
//     res.send(req.session.notes);
// });


db.open(function() {
    console.log("mongo db is opened!");		
    
    db.collection('notes', function(error, notes) {
        db.notes = notes;
    });

    app.get("/notes", function(req,res) {
        db.notes.find(req.query).toArray(function(err, items) {
            res.send(items);
        });
    });

    app.post("/notes", function(req,res) {
        db.notes.insert(req.body);
        res.end();
    });
});

/*

FOLDER STRUCTURE:

root
  app 
  server
     server.js
	 package.json
  index.html
  package.json
  
*/
  