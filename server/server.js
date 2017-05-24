var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
// библиотека к экспрессу для парсинга тела запросов
var bodyParser = require('body-parser')

// подключаем монгу базу и сервер
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
// переменная для стандартных айдишников в монге
var ObjectID = require('mongodb').ObjectID;
var db = new Db('tutor', new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {}));

// var notes_init = [
//     {text: "First note"},
//     {text: "Second note"},
//     {text: "Third note"}
// ];

app.use(express.static(path.join(__dirname, '..')));

// парсим тело запроса
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

    db.collection('sections', function(error, sections) {
		db.sections = sections;
	});

    app.get("/notes", function(req,res) {
        db.notes.find(req.query).toArray(function(err, items) {
            res.send(items);
        });
    });

    app.post("/notes", function(req,res) {
        var note = req.body;
        console.log(note);
        db.notes.insert(note);
        res.end();
    });

    app.delete("/notes", function(req,res) {
        console.log(req);
        var id = new ObjectID(req.query.id);
        db.notes.remove({_id: id}, function(err){
            if (err) {
                console.log(err);
                res.send("Failed");
            } else {
                res.send("Success");
            }
        })
    });

    app.get("/sections", function(req,res) {
        db.sections.find(req.query).toArray(function(err, items) {
            res.send(items);
        });
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
  