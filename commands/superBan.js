const { KSoftClient } = require('ksoft.js')
const ksoft = new KSoftClient('e7eb9508f1426cc4f0b7a23f61fe724213198b51')
const { Ban } = require('ksoft.js')
module.exports = {
  name:'superban',
  description:'Submits a report to KSoft.Si to ban the user across all bots using the KSoft.Si ban endpoint. It is advised you do this before banning. Use it if it\'s a TOS violation (e.g. DM advertisement) | This is a serious command, do not spam it or I will revoke access to the bot',
  aliases:['super ban'],
  usage:'Timefor superban <user ping> <reason> <proof via ksoft or imgur link> OR Timefor superban <id> <name> <discrim> <reason> <proof via ksoft or imgur link>',
  adminOnly:true,
  async execute(message, args, client){
    args = args.join(' ')
    args = args.split(' | ')
    const proof = args.splice(args.length-1, 1)[0]
    let user
    try{
      user = message.mentions.members.first()
      }
    catch{
      user = null
    }
    let name
    let id
    let discrim
    if(!user||user == null){
      id = args.shift()
      name = args.shift()
      discrim = args.shift()
    }
    else{
      id = user.id
      name = user.name
      discrim = user.discriminator
    }
    const ban = new Ban()
      .setUser(id, name, discrim)
      .setModerator(message.author.id)
      .setReason(args.join(' '), proof)
    console.log(ban)
    ksoft.bans.add(ban).then(r => console.log(r))
    message.channel.send('KSoft.Si ban submitted')
    setTimeout(function(){message.channel.bulkDelete(2)}, 3000)
  }
}