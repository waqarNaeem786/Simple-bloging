require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const session = require('express-session')

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

const User = []
const userAndPassword = []



// main blog body
app.get('/',(req,res)=>{
    res.redirect("/login")
})
app.get('/newblog',(req,res) => {
    res.render('blog')
})
app.get('/blogs',(req,res) => {
    res.render('index', {blogs: User})
})


app.post('/blog', (req,res)=>{
    User.push({
        title: req.body.title,
        body: req.body.myblog,
    })

    res.redirect('/blogs')

    console.log(User)
})
// main blog body

// login and Signup
app.get('/signup', function(req, res){
    res.render('signup');
 });
 
 app.post('/signup', function(req, res){
    if(!req.body.id || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
       userAndPassword.filter(function(user){
          if(user.id === req.body.id){
             res.render('signup', {
                message: "User Already Exists! Login or choose another user id"});
          }
       });
       
       var newUser = userAndPassword.push({
        id: req.body.id, password: req.body.password, gmail: req.body.gmail
       });
       req.session.user = newUser;
       res.redirect('/login');
       console.log(userAndPassword)
    }
 });
 function checkSignIn(req, res){
    if(req.session.user){
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }
 app.get('/blogs', checkSignIn, function(req, res){
    res.render('index', {id: req.session.user.id})
 });
 
 app.get('/login', function(req, res){
    res.render('login');
 });
 
 app.post('/login', function(req, res){
    userAndPassword.forEach((user)=>{
      if(user.password === req.body.password && user.id === req.body.id){
         req.session.user = user;
         res.redirect('/blogs');
      }
      
    })      
        
      console.log(userAndPassword)
 });
 
 app.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/login');
 });
 
 app.use('/blogs', function(err, req, res, next){
 console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('/login');
 });

 // login and Signup




app.listen(9000);