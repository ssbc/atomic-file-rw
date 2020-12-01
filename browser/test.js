const { readFile, writeFile } = require('../')

function arrEqual(lhs, rhs) {
  return lhs.length === rhs.length && lhs.every((value, index) => value === rhs[index])
}

const greetings = Buffer.from('GREETINGS')
console.log("Writing greetings as buffer", greetings)

writeFile("test.txt", greetings).then(x => {
  readFile("test.txt").then(buf => {
    console.log("got", buf)
    console.log("checking if the result is the same", arrEqual(buf, greetings))

    const greetingsStr = 'Greetings!'
    console.log("Writing greetings as string", greetingsStr)
    
    writeFile("test2.txt", greetingsStr).then(x => {
      readFile("test2.txt").then(str => {
        console.log("got", str)
        console.log("checking if the result is the same", str === greetingsStr)
      })
    })
    
  })
})
