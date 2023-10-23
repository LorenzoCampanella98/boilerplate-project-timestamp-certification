// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


// --------------------------- SOLUTION ---------------------------------

// Method to generate and return the json 
function generateJsonDate(date_){
   
    // instantiating the requested date_ in date format
    let date = new Date(date_);
  
    // If date_ is UNIX then re generate the date_ in date format
    if(isNaN(date)) {
      date = new Date(parseInt(date_))
    }
  
    // If date still null, the submitted date is invalid
    if(!isNaN(date)){
      return {
        'unix': date.getTime(), 
        'utc': date.toUTCString()
      }
    } else {
      return {
        'error' : "Invalid Date" 
      }
    }
}

// API with query
app.get('/api/:query', (req, res) => {
  let date = generateJsonDate(req.params.query); 
  res.json(date);
});

//API whitout query
app.get('/api', (req, res) => {
  let date = new Date(); 
  res.json({
     'unix': date.getTime(), 
     'utc': date.toUTCString()
  });
});

