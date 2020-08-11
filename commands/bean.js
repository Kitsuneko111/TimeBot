const Discord = require('discord.js')
module.exports = {
  name:'bean',
  description: 'absolutely definitely bans a user from the server permanently. Definitely not a joke command.',
  modOnly: true,
  usage:'Timefor bean <user>',
  args:['user'],
  async execute(message,args,client){
    let botMessage
    if(message.mentions.users.first()) botMessage = await message.reply(`beaned ${message.mentions.users.first()}`)
    else botMessage = await message.reply(`beaned ${client.members.get(args[0])}`)
    setTimeout(function(){
      message.delete()
    }, 2500)
  }
}