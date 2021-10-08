// SPDX-FileCopyrightText: 2021 Anders Rune Jensen
//
// SPDX-License-Identifier: Unlicense

const { readFile, writeFile } = require('../')

function arrEqual(lhs, rhs) {
  return lhs.length === rhs.length && lhs.every((value, index) => value === rhs[index])
}

const greetings = Buffer.from('GREETINGS')
console.log("Writing greetings as buffer", greetings)

writeFile("test.txt", greetings, (err, x) => {
  readFile("test.txt", (err, buf) => {
    console.log("got", buf)
    console.log("checking if the result is the same", arrEqual(buf, greetings))
    console.log("checking if we can do buffer operations", buf.readUInt32LE(0))

    const greetingsStr = 'Greetings!'
    console.log("Writing greetings as string", greetingsStr)
    
    writeFile("test2.txt", greetingsStr, (err, x) => {
      readFile("test2.txt", (err, str) => {
        console.log("got", str)
        console.log("checking if the result is the same", str === greetingsStr)

        writeFile("test3.txt", greetingsStr, 'utf8', (err, x) => {
          readFile("test3.txt", (err, str) => {
            console.log("got", str)
            console.log("checking if the result is the same", str === greetingsStr)
          })
        })
      })
    })
  })
})
