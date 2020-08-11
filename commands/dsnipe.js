const Discord = require('discord.js')
const Store = require('data-store')
module.exports = {
  name: 'dSnipe',
  description: 'Gets the last deleted message.',
  aliases:['dsnipe', 'DSnipe', 'Dsnipe'],
  usage: 'Timefor dSnipe',
  modOnly:true,
  execute(message,args,client){
    const store = new Store({path:`serverJsons/server${message.guild.id}`})
    const embed = new Discord.RichEmbed()
    const dMessage = store.get('lastDeleted')
    embed.setColor('#EDED00')
    embed.setAuthor(dMessage[0])
    embed.addField('Content:', dMessage[1])
    embed.setFooter(`Message sent at ${dMessage[2]}`)
    message.channel.send(embed)
  }
}