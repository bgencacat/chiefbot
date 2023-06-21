import { ChannelType, EmbedBuilder, GuildMember } from 'discord.js'
import { CreateInviteForMember } from '../db/schemas/Member'

export default async (member: GuildMember) => {
  const channel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID as string
  )
  if (!channel || channel.type != ChannelType.GuildText) return

  const embed = new EmbedBuilder()
    .setTitle('🪐 BATIKAN Discord sunucusuna hoş geldin!')
    .setColor(0xff7b00)
    .setThumbnail(member.user.avatarURL() as string)
    .setDescription(
      `Hoş geldin <@${member.user.id}>
      Seninle beraber **${member.guild.memberCount}** kişi olduk.

      🧱 <#1118958168567976007> kanalına göz atmayı unutma.`
    )
    .setTimestamp()

  channel.send({ embeds: [embed] })

  const inviteUrl = await CreateInviteForMember(member)
  const dmEmbed = new EmbedBuilder()
    .setTitle('🪐 BATIKAN Discord sunucusuna hoş geldin!')
    .setThumbnail(member.user.avatarURL() as string)
    .setColor(0xff006e)
    .setDescription(
      `Hoş geldin <@${member.user.id}>
      
      🙋‍♂️ Tek kullanımlık davet bağlantın: ${inviteUrl}.
      
      Bununla sadece **1** arkadaşını davet edebilirsin. Başka davet hakkın olmayacak.
      
      **Bilgece kullan.**
      `
    )

  member.send({ embeds: [dmEmbed] }).catch(() => {})
}
