# Atomic-file-rw

This module is meant as a replacement for
[atomic-file](https://github.com/flumedb/atomic-file) as it has better
error handling on node and is faster in the browser.

The library is written to handle writing to a few number of files in a
 safe manor. Concurrent writes to the same file are completed in the
 order they are started.

## Example

Write a buffer to file and read it again:

```js
const { readFile, writeFile } = require('atomic-file-rw')

writeFile("test.txt", Buffer.from('GREETINGS'), ((err, x) => {
  readFile("test.txt", (err, buf) => {
    console.log(buf.toString())
  })
})
```
