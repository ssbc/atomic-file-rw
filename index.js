if (typeof localStorage === "undefined" || localStorage === null)
  module.exports = require("./fs")
else
  module.exports = require("./browser")
