const Store = require('data-store')
module.exports = {
  name: 'moderator',
  description: 'Allows a role to use moderator commands',
  usage: 'Timefor moderator <ping role>',
  aliases: ['mod'],
  args:['role'],
  adminOnly: true,
  execute(message, args, client){
    const store = new Store({path:`serverJsons/server${message.guild.id.toString()}`})
    let allMods = store.get('moderators')
    if(store.get('moderators')){
       for(let i = 0; i<allMods.length;i++){
        if(allMods[i] == message.mentions.roles.first().id){
          allMods.splice(i, 1)
          store.set('moderators', allMods)
          return message.channel.send(`Role ${message.mentions.roles.first().name} was removed as a moderator.`)
        }
      }
  }
    store.union('moderators', message.mentions.roles.first().id)
    return message.channel.send(`Role ${message.mentions.roles.first().name} was added as a moderator.`)
  }
}