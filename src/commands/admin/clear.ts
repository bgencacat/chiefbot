import {
  CommandInteraction,
  TextChannel,
  SlashCommandBuilder,
} from 'discord.js'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('temizle')
    .setDescription('Sohbet kanalını temizler')
    .addIntegerOption((option) =>
      option
        .setName('miktar')
        .setDescription('Kaç mesaj silineceğini belirtir')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  category: 'admin',
  async execute(interaction: CommandInteraction) {
    const channel: TextChannel = interaction.channel as TextChannel
    const amount = interaction.options.get('miktar')?.value as number

    // clear all channel messages
    await channel.bulkDelete(amount > 100 ? 100 : amount)
    //send embed message to channel

    await interaction.reply({ content: `Sohbet temizlendi`, ephemeral: true })
  },
}
