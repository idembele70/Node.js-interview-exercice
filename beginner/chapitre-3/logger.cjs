const log = function(msg) {
  const dateTime = new Date().toLocaleTimeString()
  console.log(`[${dateTime}] ${msg}`)
}

module.exports = { log }