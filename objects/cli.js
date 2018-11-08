const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const program = require('commander')

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
    fs.writeFile('./data/test_output.json', data, function(err) {
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
    fs.writeFile('./data/health_logs.json', data, function(err) {
      if (err) throw err
      console.log('Written')
    })
  })
}
