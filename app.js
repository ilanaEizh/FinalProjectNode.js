var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.set('view engine', 'ejs');
var requireModul = require("./verification_user_data");
var fileName = 'data/users.json';

if (!fs.existsSync("./data")) { // Can't write if(!fs.exists("./files")) because will return true all the time because it is async and thus won't wait till the check complete and will alwasy enter the if.
	fs.mkdirSync("./data"); // Can write fs.mkdir("./files"); but won't be good because it is async, so if file will be written before directory is created - it will crash.
}

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/list_of_users', function(req, res) {
  if(req.body.age=="" || req.body.name==""){
    var reply ="";
    reply +='<h1 align ="center"><strong>Name or age is emty. Please enter all data.<strong></h1>';
     res.send(reply); 
     return 0;
  }

  var tmp = false;
  if(req.body.gridRadiosGender === "male")  tmp = true;

  var person = {
    name: req.body.name.trim().toString(),
    age:req.body.age.trim(),
    isMale:tmp,
    country:req.body.country
  };

  var arrayPersons = [];
  fs.readFile('data/users.json', 'utf8', function (err, data) {
    if (err) throw err;
    arrayPersons = JSON.parse(data);

     if(requireModul.verification_user_name( req.body.name, arrayPersons) != 1){
      console.log("Err 1 if");
       var reply ="";
       reply +='<h1 align ="center"><strong>Name already exist. Please try another name.<strong></h1>';
         res.send(reply); 
        return 0;
     }  
     if(requireModul.verification_user_name_lenght( req.body.name) != 1){
      console.log("Err 2 if");
       var reply ="";
         reply +='<h1 align ="center"><strong>Name must be 3-15 characters long<strong></h1>';
         res.send(reply); 
        return 0;
     }
     if(requireModul.verification_user_age( req.body.age) != 1){
      console.log("Err 3 if");
       var reply ="";
       reply +='<h1 align ="center"><strong>Age must be 1-120 <strong></h1>';
       res.send(reply); 
      return 0;
 }
    arrayPersons.push(person);
    fs.writeFile(fileName, '', function(){console.log('done')});
    fs.appendFileSync(fileName, JSON.stringify(arrayPersons));
    res.sendFile(__dirname + '/list_of_users.html');
  });
   
});

app.get('/list_of_users', function(req, res, next){
  var arrayPersons = [];
  var answer="";
  fs.readFile('data/users.json', 'utf8', function (err, data) {
    if (err) throw err;
    arrayPersons = JSON.parse(data);
       answer='<ul class="list-group list-group-flush"> <strong>';
        arrayPersons.forEach( function(user) {
          console.log("*** ");
          answer += "<li class='list-group-item'><p> Name: " + user.name+"</p> ";
          answer += "Age: " + user.age+", ";
          answer += "Gender: " + user.isMale+", "; 
          answer += "Country: " + user.country;
          answer += '</li> <hr class="my-4">';
         }); 
         answer +="</strong></ul>";
         res.send(""+answer);
  });
 
});


app.get('/', function(req, res, next){
  res.sendFile(__dirname+'/index.html');
});


// Run server: 
app.listen(process.env.PORT || 7890);

