const Store = require('data-store')
module.exports = {
  name: 'help',
  description:'Opens this message',
  usage: 'Timefor help <command>',
  aliases: ['h', 'commands'],
  execute(message, args, imports){
    const store =new Store({path:`serverJsons/server${message.guild.id.toString()}`})
    const prefix = process.env.PREFIX
    const Discord = require('discord.js')
    const embed = new Discord.RichEmbed()
    embed.setColor('#EDED00')
    embed.setTitle('Help Page')
    embed.setAuthor(message.author.username)
    const data = []
    const {commands } = message.client
    if(!args.length){
      let found
      data.push('Command prefix is \''+prefix+'\'.')
      embed.addField('Here\'s a list of all commands:', data)
      //console.log(commands)
      for(let i = 0; i<commands.size; i++){
        //console.log(commands.array()[i].adminOnly)
        //console.log(commands.array()[i])
        if(commands.array()[i].modOnly&&!message.member.hasPermission('ADMINISTRATOR')){
          for(let j = 0; j<message.member.roles.size;j++){
            if(store.get('moderators')){
              if(store.get('moderators').includes(message.member.roles.array()[j].id)){
                embed.addField(` - ${commands.array()[i].name}`, '\u200b')
              }
            }
            
            //else 'hi'
          }
        }
        else if(commands.array()[i].modOnly&&message.member.hasPermissions(['ADMINISTRATOR']))embed.addField(` - ${commands.array()[i].name}`, '\u200b')
        
        else if(commands.array()[i].adminOnly && message.member.hasPermissions(['ADMINISTRATOR'])) embed.addField(` - ${commands.array()[i].name}`, '\u200b')
        else if(!commands.array()[i].adminOnly && !commands.array()[i].modOnly) embed.addField(` - ${commands.array()[i].name}`, '\u200b')
      } 
      //embed.addField(commands.map(command => ' - '+command.name).join('\n'), '\u200b')
      embed.setFooter('You can use \''+prefix+'help <command>\' to get details on a command. | Commands you cannot access are hidden')
      
    }
    else {
      const command = commands.get(args[0]) || commands.find(c => c.aliases && c.aliases.includes(args[0]))
      if (!command) return message.reply('That is not a known command.')
      embed.addField('**Name: **', command.name)
      if(command.description) embed.addField('**Description: **', command.description)
      if(command.aliases) embed.addField('**Aliases **', command.aliases.join(', '))
      if(command.usage) embed.addField('**Usage: **', command.usage)
      
      
    }
  
    return message.channel.send(embed)
  }
}