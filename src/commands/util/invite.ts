import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js'
import { CreateInviteForMember } from '../../db/schemas/Member'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('davet')
    .setDescription('Davet kodunu görüntüle'),

  async execute(interaction: CommandInteraction) {
    const member =
      (interaction.options.get('kullanıcı')?.member as GuildMember) ||
      (interaction.member as GuildMember)
    if (!member) return

    const inviteUrl = await CreateInviteForMember(member)

    const embed = new EmbedBuilder()
      .setTitle(`💌 BATIKAN Discord sunucusuna davet kodun`)
      .setColor(0xff006e)
      .setDescription(
        `Merhaba <@${member.user.id}>

        Tek kullanımlık davet bağlantın: ${inviteUrl}. 
        
        Bununla sadece **1** arkadaşını davet edebilirsin. Başka davet hakkın olmayacak.

        **Bilgece kullan.**
        `
      )
      .setThumbnail(
        interaction.guild?.iconURL() ||
          interaction.client.user?.avatarURL() ||
          interaction.user.avatarURL() ||
          ''
      )

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },
}
