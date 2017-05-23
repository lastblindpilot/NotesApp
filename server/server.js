var express = require('express');
var app = express();
var path = require('path');


app.listen(8080);

app.get("/notes", function(req,res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   var notes = [
       {text: "First note"},
       {text: "Second note"},
       {text: "Third note"},
       {text: "4 note"}
   ]
   res.send(notes);
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
  