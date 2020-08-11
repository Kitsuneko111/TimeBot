const Discord = require('discord.js')
module.exports = {
  name:'clear',
  description:'Clears the last message(s).',
  usage:'Timefor clear <amount>',
  aliases:['delete', 'remove'],
  args:['amount'],
  modOnly:true,
  async execute(message, args, client){
    message.channel.bulkDelete(parseInt(args[0])+1)
    const botMessage = await message.channel.send(`Cleared ${args[0]} messages`)
    console.log(botMessage)
    setTimeout(function(){
      botMessage.delete()
    }, 2500)
  }
}