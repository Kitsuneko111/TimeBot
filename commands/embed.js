const Discord = require('discord.js')
const Store = require('data-store')
module.exports = {
  name: 'embed',
  description: 'Gets the last edited message.',
  //aliases:['esnipe', 'ESnipe', 'Esnipe'],
  usage: 'Timefor eSnipe',
  modOnly:true,
  execute(message,args,client){
    const store = new Store({path:`serverJsons/server${message.guild.id}`})
    const embed = new Discord.RichEmbed()
    const dMessage = store.get('lastEdited')
    embed.setColor('#EDED00')
    //embed.setAuthor(dMessage[])
    //embed.addField('Origianl content:', dMessage[1])
    embed.addField(args[0], "content")
    //embed.setFooter(`Message sent at ${dMessage[2]}`)
    message.channel.send(embed)
  }
}