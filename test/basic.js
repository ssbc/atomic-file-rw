const tape = require('tape')
const { readFile, writeFile } = require('../')

tape('Basic', (t) => {
  const greetings = Buffer.from('GREETINGS')
  writeFile("test.txt", greetings, (err, x) => {
    readFile("test.txt", (err, buf) => {
      t.deepEqual(buf, greetings)
      
      const greetingsStr = 'Greetings!'
      
      writeFile("test2.txt", greetingsStr, { encoding: 'utf8' }, (err, x) => {
        readFile("test2.txt", { encoding: 'utf8' }, (err, str) => {
          t.deepEqual(str, greetingsStr)
          t.end()
        })
      })
    })
  })
})
