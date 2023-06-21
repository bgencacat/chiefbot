import { Events, GuildMember } from 'discord.js'
import welcomeNewMember from '../actions/welcomeNewMember'
import { CreateMember } from '../db/schemas/Member'

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member: GuildMember) {
    CreateMember(member)
    welcomeNewMember(member)

    // updateMemberCount(member)
  },
}
