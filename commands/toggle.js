const Store = require('data-store')
const Discord = require('discord.js')
module.exports = {
  name: 'toggle',
  description: 'Toggles the usability of a command',
  aliases: ['allow', 'deny', 'enable', 'disable'],
  adminOnly: true,
  usage: 'Timefor toggle <command>',
  args:['command'],
  execute(message, args, client){
    const store = new Store({path:`serverJsons/server${message.guild.id.toString()}`})
    //console.log(store)
    //console.log(store.data)
    const command = client.commands.get(args[0])
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))
    if(args[0] == 'list'){
      const embed = new Discord.RichEmbed()
      embed.setTitle('List of disabled commands')
      embed.setColor('#EDED00')
      for(const commandStatus in store.get('commands')){
        console.log(commandStatus)
        if(store.get(`commands.${commandStatus}`) == 'Disabled') embed.addField(`-${commandStatus}`, '\u200b')
      }
      embed.setFooter('\'Timefor toggle <command>\' to toggle the command')
      embed.setTimestamp(new Date())
      message.channel.send(embed)
      return
    }
    if(!command) return message.reply('That is not a command.')
    if(command.name == 'toggle') return message.reply('Nice try.')
    if(store.get(`commands.${command.name}`) == 'Disabled') store.set(`commands.${command.name}`, 'Enabled')
    else store.set(`commands.${command.name}`, 'Disabled')
    message.channel.send(`Toggled ${command.name} command to ${store.get(`commands.${command.name}`)}`)
    
  }
}