const Discord = require('discord.js')
const Store = require('data-store')
module.exports = {
  name: 'eSnipe',
  description: 'Gets the last edited message.',
  aliases:['esnipe', 'ESnipe', 'Esnipe'],
  usage: 'Timefor eSnipe',
  modOnly:true,
  execute(message,args,client){
    const store = new Store({path:`serverJsons/server${message.guild.id}`})
    const embed = new Discord.RichEmbed()
    const dMessage = store.get('lastEdited')
    embed.setColor('#EDED00')
    embed.setAuthor(dMessage[0])
    embed.addField('Origianl content:', dMessage[1])
    embed.addField('Edited content:', dMessage[3])
    embed.setFooter(`Message sent at ${dMessage[2]}`)
    message.channel.send(embed)
  }
}