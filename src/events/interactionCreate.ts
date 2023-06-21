import { Collection, CommandInteraction, Interaction } from 'discord.js'

const { Events } = require('discord.js')
8
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`${interaction.commandName} adında komut yok.`)
      return
    }

    const { cooldowns } = interaction.client

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.data.name)
    const defaultCooldownDuration = 3
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000)
        return interaction.reply({
          content: `Çok hızlısın! Biraz bekle. <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        })
      }
    }

    timestamps.set(interaction.user.id, now)
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount)

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(`${interaction.commandName} tetiklenirken hata oluştu`)
      console.error(error)
    }
  },
}
