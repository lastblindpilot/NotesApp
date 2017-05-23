var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');

var notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.use(express.static(path.join(__dirname, '..')));

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.listen(8080);

app.get("/notes", function(req,res) {
    console.log("reading notes", req.session.notes);
    if (!req.session.notes) {
        req.session.notes = notes_init;
    }
    res.send(req.session.notes);
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
  