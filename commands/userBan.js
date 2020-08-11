const Discord = require('discord.js')
module.exports = {
  name:'ban',
  description: 'bans a user from the server',
  modOnly: true,
  usage:'Timefor ban <user> <reason (optional)>',
  args:['user'],
  async execute(message,args,client){
    let user = args.shift()
    let reason = args.join(' ')
    if(message.mentions.members.first()){
      message.mentions.members.first().send(`You have been banned from ${message.guild.name}${reason.length?` for ${reason}`:''}`)
      message.mentions.members.first().ban(reason.length?reason:'')
    }
    else{
      user = message.guild.members.find(val => val.id == user || val.user.username == user || val.nickname == user)
      if(!user) return message.reply('User not specified or does not exist')
      user.send(`You have been banned from ${message.guild.name}${reason.length?` for ${reason}`:''}`)
      user.ban(reason.length?reason:'')
    }
    let botMessage = await message.channel.send('User has been banned')
    setTimeout(() => {botMessage.delete()}, 2500)
  }
}