require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const db_manager = require('./objects/db_manager')

const app = express()
db = new db_manager()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

app.post('/api/log/water', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)
  res.setHeader('Content-Type', 'text/plain')
  res.end(JSON.stringify(req.body, null, 2))
  json_input = req.body
})

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port: ` + process.env.SERVER_PORT)
)
