const Discord = require('discord.js')
const client = new Discord.Client({disableEveryone: true})
const Store = require('data-store')

//const { KSoftClient } = require('ksoft.js')
//const ksoft = new KSoftClient('e7eb9508f1426cc4f0b7a23f61fe724213198b51')
/*client.on('message', message => {
  for(const guild in client.guilds){
      const banArray = ksoft.bans.check(guild.members.array()) 
      for(let i = 0;i<banArray.length;i++){
        guild.ban(guild.members.find(val => val.id == banArray[i]), 'KSoft.Si ban')
      }    
  }
})*/

client.on('guildMemberAdd', member =>{
  const banInfo = ksoft.bans.info(member)
  if(banInfo.exists) member.guild.ban(member, 'KSoft.Si ban')
})

client.on('messageDelete', message => {
  const store = new Store({path:`serverJsons/server${message.guild.id}`})
  store.set('lastDeleted', [message.author.username, message.content, message.createdAt])
})

client.on('messageUpdate', (oldMessage, newMessage)=>{
  const store = new Store({path:`serverJsons/server${newMessage.guild.id||'serverJsons/DM'}`})
  if(!newMessage.author.bot)store.set('lastEdited', [newMessage.author.username,oldMessage.content,newMessage.editedAt,newMessage.content])
})

const usage = require("./Usage.js")
const retry = require('retry')
const http = require('http')
const express = require('express')
const app = express()
const config = require('./config.json')
/*app.get('/', (request, response)=>{
  response.send("works")
})
app.listen(process.env.PORT)
setInterval(()=>{
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)}, 250000)
*/
const prefix = config.prefix
const fs = require('fs')

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'))

for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

const console_log = require('./consoleLog.js')
class console_char{
  constructor(){
    this.username = 'Console'
    this.id=''
  }
}
class ready{
  constructor(){
    this.content = "Login Ready"
  }
}

client.once('ready', () => {
  console_log.execute(new ready, 6, new console_char(), client)
  client.user.setStatus("available")
  client.user.setPresence({game:{name:"Timefor help | Tf help", type: "STREAMING", url:"http://www.twitch.tv/Timemaster_111"}})
})

client.on('message', message =>{
  if(message.content.startsWith('Ae!eval ')&&(message.author.id == '356826975815598080'||message.author.id=='593833356253462529')){
    let evalContent = message.content.slice(8)
    let returnValue
    try {returnValue = eval(evalContent)}
    catch(err){
      message.channel.send(err)
    }
    //return message.channel.send(returnValue)
  }
  let store
  if(message.guild) store = new Store({path:`serverJsons/server${message.guild.id.toString()}`})
  else store = null
  //const commandsPerServer = store.get('commands')
  const msgText = message.content
  //console.log(store)
  //console.log(store.data)
  //console.log(message)
  if((message.author.bot&&message.author != client.user) || message.channel.type !== 'text') return
  
  if(!msgText.startsWith('Timefor ')&&!msgText.startsWith('timefor ')&&!msgText.startsWith('Tf ')&&!msgText.startsWith('tf ')) return
  
  console_log.execute(message, 5, message.author, client)
  
  let args
  if(msgText.startsWith('tf ')||msgText.startsWith('Tf ')) args = message.content.slice(3).split(/ +/)
  else args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()
  
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
  if(!command) return
  if(command.args && !args.length){
    return message.channel.send('You didn\'t provide any arguments.')
    
  }
  //console.log(message.author)
  if(command.adminOnly && !message.member.hasPermission('ADMINISTRATOR')) return message.reply('That is an admin only command')
  //console.log(store.get(`commands.${command.name}`))
  if(store.get(`commands.${command.name}`) == 'Disabled') return //message.channel.send('you cannot use that here')
  let found = true
  if(command.modOnly&&!message.member.hasPermission('ADMINISTRATOR')){
    found = false
    //console.log(message.member.roles)
    for(let i = 0; i<message.member.roles.size;i++){
      
      //if(!store.get('moderators'))return
      if(store.get('moderators').includes(message.member.roles.array()[i].id)){
        found = true
      }
    }
  }
  if(!found)return message.channel.send('cannot send that here')
  try{
    command.execute(message, args, client)
    //usage.execute(message, commandName)
  } catch(error){
    console_log.execute(error, 1, message.author, client)
    message.reply('There was an error trying to execute that command. An error message has been sent. If this reoccurs, submit a bug.')
  }
  
})

client.on('message', message => {
  if(message.channel.id != '693898748379529216') return
  if(!message.content.startsWith('OIO!add ')) return
  let args = message.content.split(' ')
  args.shift()
  console.log(args)
  args = args.join(' ')
  message.channel.send(args)
  message.delete()
})

client.login(config.token)
//console_log
//test