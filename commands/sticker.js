const Store = require('data-store')
const Discord = require('discord.js')
module.exports = {
  name: 'sticker',
  description: 'Gives a sticker to the user',
  usage: 'Timefor sticker <user>',
  execute(message, args, client){
    let fullUser = message.mentions.users.first() || message.author
    //console.log(fullUser)
    const user = fullUser.id
    //console.log(user)
    //console.log(message.mentions.users)
    
    const store = new Store({path:`serverJsons/server${message.guild.id}`})
    try{store.set(`${user}.stickers`, store.get(`${user}.stickers`)+1)}
    catch(err){
      store.set(`${user}.stickers`, 2)
    }
    const embed = new Discord.RichEmbed()
    embed.setColor('#eded00')
    embed.setTitle('Good Job')
    embed.setAuthor(`From ${message.author.username}`)
    if(store.get(`${user}.stickers`) < 1 || !store.get(`${user}.stickers`)) embed.addField('You got a sticker!', 'Congratulations')
    else embed.addField('You got another sticker!', `Total: ${store.get(`${user}.stickers`)}`)
    //embed.attachFiles(['../assets/104052.jpg'])
    embed.setImage('https://cdn.glitch.com/71973164-5f74-4ce0-b6a2-703975c53358%2F104052.jpg?v=1572272570787')
    embed.setFooter('Image provided by www.freepik.com')
    message.channel.send(embed)
    
    
  }
}