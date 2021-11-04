const express = require('express');
const app = express();
const fs = require("fs");

app.use('/scripts', express.static('./scripts'));
app.use('/styles', express.static('./styles'));
app.use('/images', express.static('./images'));

// Go to: http://localhost:8000
app.get('/', function (req, res) {
    let doc = fs.readFileSync('./html/Home.html', "utf8");
    res.send(doc);
});

app.get('/Home.html', function (req, res) {
    let doc = fs.readFileSync('./html/Home.html', "utf8");
    res.send(doc);
});

app.get('/Friends.html', function (req, res) {
    let doc = fs.readFileSync('./html/Friends.html', "utf8");
    res.send(doc);
});

app.get('/Progress.html', function (req, res) {
    let doc = fs.readFileSync('./html/Progress.html', "utf8");
    res.send(doc);
});

app.get('/UserPage.html', function (req, res) {
    let doc = fs.readFileSync('./html/UserPage.html', "utf8");
    res.send(doc);
});

app.get('/activities.html', function (req, res) {
    let doc = fs.readFileSync('./html/activities.html', "utf8");
    res.send(doc);
});

app.get('/setTimer.html', function (req, res) {
    let doc = fs.readFileSync('./html/setTimer.html', "utf8");
    res.send(doc);
});

app.use(function (req, res, next) {
    res.status(404).send("Nothing there, 404.");
})
  
// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
})