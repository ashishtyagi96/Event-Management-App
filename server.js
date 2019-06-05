/**
 * Created by ashishtyagi9622 on 4/6/19.
 */

var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');
var validation = require('./functions/validation');
var http = require('http');
var fs = require('fs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/app' ));

app.get('/', function (req , res) {
    res.sendFile( __dirname + 'views/pages/index.html' );
});

app.post('/add',function (req,res) {
    console.log(req.body.data);
    fs.writeFile('app/data.json', JSON.stringify(req.body.data), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.send("doing it");
});
app.post('/addEvent',function (req,res) {
    console.log(req.body);
    validation.dateValidation(req.body,function (date) {
        res.send(date);

    })

});

app.listen(config.PORT,function (err) {
    console.log('server at port :-',config.PORT);
});