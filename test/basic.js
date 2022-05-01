// SPDX-FileCopyrightText: 2021 Anders Rune Jensen
//
// SPDX-License-Identifier: Unlicense

const tape = require('tape')
const fs = require('fs')
const { readFile, writeFile, deleteFile } = require('../')

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

tape('Concurrency', (t) => {
  let completedWrites = 0
  const concurency = Buffer.from('concurrency!')
  for (var i = 0; i < 100; ++i) {
    setTimeout(() => {
      writeFile("test.txt", concurency, (err, x) => {
        t.error(err, "no error")
        if (++completedWrites === 100)
          t.end()
      })
    }, Math.floor(Math.random() * 10))
  }
})

tape('Delete', (t) => {
  const greetings = Buffer.from('GREETINGS')
  writeFile("test.txt", greetings, (err, x) => {
    readFile("test.txt", (err, buf) => {
      t.deepEqual(buf, greetings)

      deleteFile("test.txt", (err, x) => {
        readFile("test.txt", (err, buf) => {
          t.ok(err, "file deleted")
          t.end()
        })
      })
    })
  })
})

tape('teardown', (t) => {
  try{
    fs.unlinkSync('test.txt')
  } catch (e) {}
  try {
    fs.unlinkSync('test2.txt')
  } catch (e) {}
  t.end()
})