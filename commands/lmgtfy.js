Discord = require("discord.js")
module.exports = {
  name:"lmgtfy",
  description:"searches the internet so you dont have to....kinda.",
  aliases:["search","find","google"],
  usage:["Timefor lmgtfy <search>"],
  execute(message,args,client){
    const embed = new Discord.RichEmbed()
    embed.setAuthor(message.author.username)
    embed.setTitle(`"${args.join(" ")}"`)
    embed.setColor("#eded00")
    embed.addField("Hang on, I'll get it!", "This has now been searched on your behalf.")
    embed.setURL(`https://www.lmgtfy.com/?q=${args.join("+")}&&iie=1`)
    message.reply(embed)
  }
}