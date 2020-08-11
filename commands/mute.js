const Discord = require('discord.js')
const Store = require('data-store')
//const reportLog = require('../reportLog.js')

module.exports = {
  name: 'mute',
  description: 'Toggles if a user is muted.',
  aliases: ['silence', 'unmute', 'unsilence'],
  usage:'Timefor mute <user>',
  modOnly:true,
  args:['member'],
  async execute(message, args, client){
    const store = new Store({path:`serverJsons/server${message.guild.id.toString()}`})
    let member
    //console.log(args.shift())
    if(message.mentions.users.first()){ member = message.guild.members.find(val => val.id == message.mentions.users.first().id)
                                       args.shift()}
    else member = await message.guild.fetchMember(args.shift())
    //console.log(args)
    //console.log(message.mentions.users.first)
    
    if(store.get('muteRole')){
      
        if(!member.roles.find(val => val.id == store.get('muteRole'))){
          store.set(`${member.id}.oldRoles`, '')
          for(let i = 0; i< member.roles.size; i++){
            store.union(`${member.id}.oldRoles`, member.roles.array()[i].id)
          }
          await member.removeRoles(member.roles)
          console.log(store.get('muteRole'))
          await member.addRole(store.get('muteRole'))
          //let report = new reportLog.Report(member.user.username, 'muted', message.author.username, args.join(' ')) 
          //reportLog.execute(report, client)
          const botMessage = await message.channel.send(`Muted ${member.user.username}`)
          setTimeout(function(){
            botMessage.channel.bulkDelete(2)
          }, 2000)
        }
        else{
          await member.removeRole(message.guild.roles.find(val => val.id ==store.get('muteRole')))
          await member.addRoles(store.get(`${member.id}.oldRoles`))
          //let report = await new reportLog.Report(member.user.username, 'unmuted', message.author.username, args.join(' '))
          //await reportLog.execute(report, client)
          const botMessage = await message.channel.send(`Unmuted ${member.user.username}`)
          setTimeout(function(){
            botMessage.channel.bulkDelete(2)
          }, 2000)
        }
      
      
    }
    else return message.reply('No mute role set')
  }
  
}