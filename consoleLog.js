const Discord = require('discord.js')

module.exports = {
  execute(item, priority, author, client){
    const embed = new Discord.RichEmbed()
    
    const colors = {
      1:'#ff4242',
      2:'#f2ab46',
      3:'#dbf246',
      4:'#8ef246',
      5:'#2bff64',
      6:'#2251a8'
    }
    if(priority<1){
      priority = 1
    }
    if(priority>6){
      priority = 5
    }
    embed.setColor(colors[priority])
    embed.setTitle('LOG')
    embed.setAuthor(`${author.username} - ${author.id}`)
    if(item.guild) embed.addField(`Server: ${item.guild.name}`, `Channel: #${item.channel.name}`)
    if(priority > 2)embed.addField('Logged Item:', item.content)
    else embed.addField('Logged Item:', item)
    embed.addField('Priority: ', priority)
    embed.addField("<:Timebot:616198553416499206>", "emoji")
    embed.setFooter('Official Log')
    embed.setTimestamp(new Date())
    client.channels.get('615257550358839306').send(embed)
    if(priority < 3) client.channels.get('615257550358839306').send('<@&614413208739905541>')
    if(priority < 3) console.log(item)
    else console.log(item.content)
    
  }
}