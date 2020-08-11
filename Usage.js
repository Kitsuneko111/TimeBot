const store = require("data-store")("Usage")
module.exports = {
  execute(message, command){
    store.set(global.command, global.command+1)
    store.set(message.guild.id.command, store.get(message.guild.id.command)+1)
  }
}