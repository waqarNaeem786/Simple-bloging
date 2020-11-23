var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const User = []

app.get('/', (req,res) => {
    res.render('index', {blogs: User})
})

app.get('/newblog',(req,res) => {
    res.render('blog')
})

app.post('/blog', (req,res)=>{
    User.push({
        title: req.body.title,
        body: req.body.myblog,
    })

    res.redirect('/')

    console.log(User)
})

app.listen(3000);