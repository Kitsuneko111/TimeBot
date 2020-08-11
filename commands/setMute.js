const Store = require('data-store')
module.exports = {
  name: 'setMute',
  description: 'Sets the mute role',
  usage: 'Timefor setMute <role>',
  args:['role'],
  aliases:['setmute', 'muterole','muteRole'],
  adminOnly:true,
  execute(message,args,client){
    const store = new Store({path:`serverJsons/server${message.guild.id}`})
    store.set('muteRole', message.mentions.roles.first().id)
    
    return message.channel.send('Role set.')
  }
}