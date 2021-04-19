const fs = require('fs')
const path = require('path')
const mutexify = require('mutexify')

function getEncoding(opts) {
  return opts && opts.encoding ? opts.encoding : null
}

const locks = new Map()

module.exports = {
  readFile: function(filename, opts, cb) {
    if (!cb) cb = opts
    fs.readFile(filename, getEncoding(opts), cb)
  },
  writeFile: function(filename, value, opts, cb) {
    if (!cb) cb = opts

    if (!locks.has(filename))
      locks.set(filename, mutexify())

    const lock = locks.get(filename)

    lock((unlock) => {
      const tempFile = filename + '~'

      // make sure dir exists
      fs.mkdirSync(path.dirname(tempFile), { recursive: true })

      fs.open(tempFile, 'w', (err, fd) => {
        if (err) return unlock(cb, err)
        fs.writeFile(fd, value, getEncoding(opts), (err) => {
          if (err) return unlock(cb, err)
          fs.fsync(fd, (err) => {
            if (err) return unlock(cb, err)
            fs.close(fd, (err) => {
              if (err) return unlock(cb, err)
              fs.rename(tempFile, filename, (err) => {
                if (err) return unlock(cb, err)
                unlock(cb, null, value)
              })
            })
          })
        })
      })
    })
  }
}
