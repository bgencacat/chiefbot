import {
  CommandInteraction,
  TextChannel,
  SlashCommandBuilder,
} from 'discord.js'

import mdToEmbed from '../../utils/mded'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oyunarkadaşı')
    .setDescription('Oyun arkadaşı rehber odası biçimlendirmelerini yazar.')
    .setDefaultMemberPermissions(0),
  category: 'admin',
  async execute(interaction: CommandInteraction) {
    const channel: TextChannel = interaction.channel as TextChannel

    // clear all channel messages
    await channel.bulkDelete(100)
    //send embed message to channel
    await channel.send({
      embeds: mdToEmbed('./src/texts/lfg.md'),
    })

    await interaction.reply({
      content: `Oyun arkadaşı rehber odası ayarlandı`,
      ephemeral: true,
    })
  },
}
