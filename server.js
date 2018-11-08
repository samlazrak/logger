const program = require('commander')
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

/* General functions */
async function readJson(input) {
  return await readFile(input, 'utf8')
}

async function writeJson(input) {
  readJson(input).then((data) => {
    data = JSON.parse(data)
    data['health_logs'].push({
      type: 'water',
      amount: '32oz',
      date: '2018-11-08T02:00:00+00:00'
    })
    data = JSON.stringify(data)
    fs.writeFile('output.json', data, function(err) {
      if (err) throw err
      console.log('Written')
    })
  })
}

async function postJson(input, json) {
  readJson(input).then((data) => {
    data = JSON.parse(data)
    data['health_logs'].push(json)
    data = JSON.stringify(data)
    fs.writeFile('output.json', data, function(err) {
      if (err) throw err
      console.log('Written')
    })
  })
}

/* Exoress server & routes */
const app = express()
app.get('/', (req, res) => {
  program.command('i <dir>').action((dir) => {
    res.send('Input: ' + dir)
    console.log(dir)
  })
  program.parse(process.argv)
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
  postJson('health_logs.json', json_input)
})

app.listen(3000, () => console.log(`Listening on 3000!`))
