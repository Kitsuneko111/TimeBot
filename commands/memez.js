const { KSoftClient } = require('ksoft.js')
const ksoft = new KSoftClient('e7eb9508f1426cc4f0b7a23f61fe724213198b51')
const Discord = require('discord.js')
module.exports = {
  name: 'memez',
  description: '',
  aliases: ['memes', 'meme'],
  usage: 'Timefor memez',
  async execute(message, args, imports){
    const embed = new Discord.RichEmbed()
    let meme = await ksoft.images.meme()
    embed.setTitle('Meme:')
    embed.setColor('#EDED00')
    console.log(meme)
    let memeurl = meme.url
    embed.setImage(memeurl)
    embed.setFooter('powered by KSoft.Si')
    embed.setURL(meme.post.link)
    message.channel.send(embed)
    //console.log(meme)
  }
}
/* const meme = await ksoft.images.meme()
return message.channel.send(meme.url) */
