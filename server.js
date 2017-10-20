const fs = require ('fs');
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const app = express()

app.engine('mustache', mustacheExpress())
app.set('Views', __dirname + '/Views')
app.set('view engine', 'mustache')

app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
 secret: 'Ala Peanut Butter',
 resave: false,
 saveUninitialized: true
}));

// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let hangMan = {
    word: newWord(),
    gameWord: [],
    guessedLetter: [],
    guesses: 8,
    message: 'you are smart'
}

app.get('/', function(req, res){
  hangMan.gameWord = wordPlacement(hangMan.word, hangMan.guessedLetter);
    res.render("index", hangMan);
    console.log('this is', hangMan);
  });


app.post('/', function(req, res){
  if(!hangMan.guessedLetter.includes(req.body.letter)){
    lettersGuessed(req.body.letter);
  } else if (!hangMan.word.includes(req.body.letter)){
    hangMan.guesses -= 1;
  } else if (hangMan.guesses > 0 ) {
    res.redirect('/');
  }  else {
      res.render('fin', hangMan);
  }
});

function newWord(){
  let newWord = words[Math.floor(Math.random()*words.length)];
  return newWord;
}

function wordPlacement(word, letters){
  let gameWord = [];
  console.log(word);
  for (let i = 0; i < word.length; i++) {
    if(word.includes(letters[i])){
      gameWord.push(letters[i]);
    } else {
      gameWord.push('_');
    }
  }
  return gameWord;
}

function lettersGuessed(a){
  hangMan.guessedLetter.push(a);
  return hangMan.guessedLetter;
}


function newGame(){
  let newHangMan = {
    word: newWord(),
    gameWord: [],
    guessedLetter: [],
    guesses: 8,
    message: 'You are a regular word smith'
  };
  return newGame;
}

 app.get("/", function (req,res){
      res.render("game");
 })

app.listen(3000, function() {
  console.log('Let\'s play Mystery Word!!!');
});
