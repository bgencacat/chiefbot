import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js'
import { GetMember } from '../../db/schemas/Member'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seviye')
    .setDescription('Seviyeni görüntüle')
    .addUserOption((option) =>
      option
        .setName('kullanıcı')
        .setDescription(
          'Seviyesini görüntülemek istediğiniz kullanıcıyı belirtir'
        )
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction) {
    const member =
      (interaction.options.get('kullanıcı')?.member as GuildMember) ||
      (interaction.member as GuildMember)
    if (!member) return

    const Member = await GetMember(member)

    const embed = new EmbedBuilder()
      .setTitle(
        `(${Member.level}) ${member.user.username}
        `
      )
      .setDescription(
        `
        Seviye: ${Member.level}
        XP: ${Member.xp}/100
        `
      )
      .setThumbnail(member.displayAvatarURL())

    await interaction.reply({ embeds: [embed] })
  },
}
