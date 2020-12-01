const tape = require('tape')
const { readFile, writeFile } = require('../')

const greetings = Buffer.from('GREETINGS')

tape('Basic', (t) => {
  writeFile("test.txt", greetings).then(x => {
    readFile("test.txt").then(buf => {
      t.deepEqual(buf, greetings)
      
      const greetingsStr = 'Greetings!'
      
      writeFile("test2.txt", greetingsStr, { encoding: 'utf8' }).then(x => {
        readFile("test2.txt", { encoding: 'utf8' }).then(str => {
          t.deepEqual(str, greetingsStr)
          t.end()
        })
      })
    })
  })
})
