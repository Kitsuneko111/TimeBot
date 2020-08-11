const Discord =require("discord.js")
module.exports = {
  name:"invite", 
  description:"Sends an invite to get the bot",
  usage:"Timefor invite",
  async execute(message, args, client){
    let invite = await client.generateInvite(["ADMINISTRATOR"])
    message.author.send(invite)
  }
}