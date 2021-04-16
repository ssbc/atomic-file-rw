const fs = require('fs')

function getEncoding(opts) {
  return opts && opts.encoding ? opts.encoding : null
}

module.exports = {
  readFile: function(filename, opts, cb) {
    if (!cb) cb = opts
    fs.readFile(filename, getEncoding(opts), cb)
  },
  writeFile: function(filename, value, opts, cb) {
    if (!cb) cb = opts
    const tempFile = filename + '~'
    fs.open(tempFile, 'w', (err, fd) => {
      if (err) return cb(err)
      fs.writeFile(fd, value, getEncoding(opts), (err) => {
        if (err) return cb(err)
        fs.fsync(fd, (err) => {
          if (err) return cb(err)
          fs.close(fd, (err) => {
            if (err) return cb(err)
            fs.rename(tempFile, filename, function (err) {
              if(err) cb(err)
              else cb(null, value)
            })
          })
        })
      })
    })
  }
}
