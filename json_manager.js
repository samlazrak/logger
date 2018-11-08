const fs = require('fs')
const util = require('util')
var program = require('commander')

// Created a promise of fs.readFile to mess around
const readFile = util.promisify(fs.readFile)

// Promise will return data when needed
async function readJson(input) {
  return await readFile(input, 'utf8')
}

async function writeJson(input) {
  // Like right now!
  readJson(input).then((data) => {
    // fs.readFile() reads the json in as string, needs to be parsed into an object
    data = JSON.parse(data)
    // Now that it's an object we can use push() to add a new json object to the end of the health_logs array
    data['health_logs'].push({
      type: 'water',
      amount: '32oz',
      date: '2018-11-08T02:00:00+00:00'
    })
    // Afterwards it's neccesary to turn it back into a string for fs.writeFile()
    data = JSON.stringify(data)
    fs.writeFile('output.json', data, function(err) {
      if (err) throw err
      console.log('Written')
    })
  })
}

// Works with one input but not two, unable to specify output file
program.command('i <dir>').action((dir) => {
  writeJson(dir)
})

program.parse(process.argv)
