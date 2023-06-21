import { Events, VoiceState } from 'discord.js'
import { GiveXp } from '../db/schemas/Member'
import voiceDuration from '../utils/voiceDuration'

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState: VoiceState, newState: VoiceState) {
    if (!newState || !newState.member) return
    if (newState?.member?.user.bot) return

    GiveXp(newState.member, voiceDuration(newState) * 1)
  },
}
