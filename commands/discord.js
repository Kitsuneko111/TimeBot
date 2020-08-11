const Discord = require('discord.js')
module.exports = {
  name: 'discord',
  description: 'Sends an invite to the discord server.',
  aliases: ['server', 'broken'],
  usage: 'Timefor discord',
  execute(message, args, client){
    message.author.send('Here is the link: discord.gg/qdrbpvV')
  }
}