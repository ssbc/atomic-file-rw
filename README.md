# Atomically universal

A wrapper around
[atomically](https://github.com/fabiospampinato/atomically) that
enables it to also run in the browser by writing to indexed db.

This module only exposes the non-sync methods and can be used as a
replacement for [atomic-file](https://github.com/flumedb/atomic-file)
as it has better error handling on node.

## Example

Write a buffer to file and read it again:

```js
const { readFile, writeFile } = require('atomically-universal')

writeFile("test.txt", Buffer.from('GREETINGS')).then(x => {
  readFile("test.txt").then(buf => {
    console.log(buf.toString())
  })
})
```

