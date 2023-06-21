import { Events, Message } from 'discord.js'
import { randomInt } from 'crypto'
import { GiveXp } from '../db/schemas/Member'

module.exports = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot || !message.member) return

    GiveXp(message.member, randomInt(1, 4))
  },
}
