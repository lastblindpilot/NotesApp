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

var root = __dirname + '/..';

// var notes_init = [
//     {text: "First note"},
//     {text: "Second note"},
//     {text: "Third note"}
// ];
app.use(express.static(root));

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

    db.collection('users', function(error, users) {
        db.users = users;
    });

    app.post("/login", function(req,res) {
        db.users.find({   
                    name: req.body.name,
                    password: req.body.password  
                })
        .toArray(function(err, items) {
            if (items.length>0) {
                req.session.userName = req.body.name;
            }
            res.send(items.length>0);
        });
    });

    app.get("/logout", function(req, res) {
        req.session.userName = null;
        res.end();
    });

    app.get("/notes", function(req,res) {
        setUserQuery(req);
        db.notes.find(req.query).toArray(function(err, items) {
            res.send(items);
        });
    });

    app.post("/notes", function(req,res) {
        req.body.userName = req.session.userName || "demo";
        var note = req.body;
        console.log(note);
        db.notes.insert(note);
        res.end();
    });

    app.delete("/notes", function(req,res) {
        setUserQuery(req);
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

    app.post("/users", function(req,res) {        
        db.users.insert(req.body, function(resp) {
            req.session.userName = req.body.name;
            res.end();
        });
    });

    app.get("/sections", function(req,res) {
        var userName = req.session.userName || "demo";
        db.users.find({name:userName})
            .toArray(function(err, items) {
                var user = items[0];
                res.send(user.sections||[]);
            });
    });

    app.post("/sections/replace", function(req,res) {
        var userName = req.session.userName || "demo";
        db.users.update({userName:userName},
            {$set:{sections:req.body}},
            function() {
                res.end();
        });
    });

    app.get("/checkUserUnique", function(req,res) {
        let userName = req.query.user;
        db.users.find({name: userName}).toArray(function(err, items) {
            if (items[0]) {
                console.log(items);
                res.send(false);
            } else {
                res.send(true);
            }
        });
    });

    app.get("*", function(req, res, next) {
        res.sendFile('index.html', { root : root });
    });
});

function setUserQuery(req) {
	req.query.name = req.session.userName || "demo";
}

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
  