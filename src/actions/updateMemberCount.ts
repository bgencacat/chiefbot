import { GuildMember } from 'discord.js'

export default (member: GuildMember) => {
  const channelId = '1118916844628234310'
  const channel = member.guild.channels.cache.get(channelId)

  if (!channel) return

  channel.setName(`HOŞ GELDİN - Üye Sayısı: ${member.guild.memberCount}`)
}
