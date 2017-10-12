const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view egine', 'mustache')

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
    message: ''
}

app.get('/', function(req, res){
  hangMan.gameWord = wordPlacement(hangMan.word, hangMan.guessedLetter);
    res.render("main", hangMan);
    console.log(hangMan);
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
  let newWord = word[Math.floor(Math.random()*word.length)];
  return word;
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
    message: ''
  };
  return newGame;
}

app.get("/", function (req,res){
  res.render("main");
})

app.listen(3000, function() {
  console.log('Let\'s play Hang Man!!!');
});
