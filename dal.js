const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const app = express()

app.egine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view egine', 'mustache')

app.use(bodyParser.json())
app.use(body.Parser.urlencoded({
  extended: true
}))
