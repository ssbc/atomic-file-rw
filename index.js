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

  module.exports = {
    readFile: function(filename) {
      const { store, key } = getStoreAndKey(filename)
      return promisify(store.get.bind(store))(key)
    },
    writeFile: function(filename, value) {
      const { store, key } = getStoreAndKey(filename)
      return promisify(store.set.bind(store))(key, value)
    }
  }
}
