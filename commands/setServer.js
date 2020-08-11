
const Store = require('data-store')
const Discord = require('discord.js')
module.exports = {
  name: "setServer",
  description: "sets the default server to ping",
  modOnly:true,
  aliases:['setserver', 'SetServer', 'Setserver', 'default'],
  usage: 'Timefor setServer <IP> <port(optional)>',
  execute(message,args,client){
    if(args.length>1)args[0] = args.join(':')
    let store = new Store({path:`serverJsons/server${message.guild.id}`})
    store.set('default server', args[0])
    message.reply('default server set')
  }
}