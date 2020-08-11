const ping = require('minecraft-server-util')
const Store = require('data-store')
const Discord = require('discord.js')
module.exports = {
  name: "server",
  description: "pings a server to get the info for it",
  usage: 'Timefor server <server> <port(optional)>',
  execute(message,args,client){
    let server
    let port
    if(!args.length){
      let store = new Store({path:`serverJsons/server${message.guild.id}`})
      let defaultServer = store.get('default server')
      if(!defaultServer) return message.channel.send('No server specified')
      [server, port] = defaultServer.split(':')
      if(!server) server = store.get('default server')
      if(!port) port = '25565'
    }
    else{
      if(args.length == 1){
        [server, port] = args[0].split(':')
        
        if(!port) port = '25565'
      }
      else{
        server = args[0]
        port = args[1]
      }
    }
    ping(server, parseInt(port), (error, response) => {
      if(error) return message.channel.send('Server is offline or does not exist.')
      const embed = new Discord.RichEmbed()
      embed.setTitle('Server Info')
      embed.addField('IP', server)
      embed.addField('Port', port)
      embed.setColor('#eded00')
      embed.addField('Version', response.version)
      embed.addField('Players', `${response.onlinePlayers}/${response.maxPlayers}`)
      let description = response.descriptionText.replace(/[^\w\s!?./\u200b:]/g,'')
      /*for(let i = 0; i<description.length; i++){
        description[i] = description[i].substr(1)
      }*/
      embed.setDescription(description)
      embed.setFooter('Outdated information may not be fixable')
      embed.setTimestamp(new Date())
      message.channel.send(embed)
      //console.log(response)
    })
  }
}