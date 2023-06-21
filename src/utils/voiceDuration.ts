import { Collection, VoiceState } from 'discord.js'
const VoiceLogs = new Collection<string, number>()

export default (newState: VoiceState) => {
  const newChannelId = newState.channelId
  const afkChannelId = newState.guild.afkChannelId
  const memberId = newState.member?.id
  if (!memberId) return 0

  if (newChannelId == null || newChannelId == afkChannelId) {
    const time = VoiceLogs.get(newState.member?.id || '')
    if (!time) return 0

    VoiceLogs.delete(memberId)
    const minutes = Math.floor((Date.now() - time) / 1000 / 60)
    return minutes
  }

  VoiceLogs.set(memberId, Date.now())
  return 0
}
