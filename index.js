if (typeof localStorage === "undefined" || localStorage === null)
{
  module.exports = require('atomically')
}
else
{
  const IdbKvStore = require('idb-kv-store')
  const promisify = require('promisify-4loc')

  function getStoreAndKey(filename) {
    const parts = filename.split('/')
    const key = parts.pop()
    const storename = parts.join('/')
    const store = new IdbKvStore(storename, { disableBroadcast: true })
    return { store, key }
  }

  function isUint8Array(value) {
    return toString.call(value).indexOf('Uint8Array') !== -1
  }

  module.exports = {
    readFile: function(filename) {
      const { store, key } = getStoreAndKey(filename)
      const storeGet = store.get.bind(store)
      function get(key, cb) {
        storeGet(key, (err, value) => {
          if (err) return cb(err)
          else cb(null, isUint8Array(value) ? Buffer.from(value) : value)
        })
      }
      return promisify(get)(key)
    },
    writeFile: function(filename, value) {
      const { store, key } = getStoreAndKey(filename)
      return promisify(store.set.bind(store))(key, value)
    }
  }
}
