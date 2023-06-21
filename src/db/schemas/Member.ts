import { GuildMember, TextChannel } from 'discord.js'
import mongoose, { Schema } from 'mongoose'
import { updateRoleByLevel } from '../../utils/roles'

const memberSchema = new Schema({
  id: String,
  xp: Number,
  level: Number,
  inviteUrl: String,
})

type Payload = {
  xp?: number
  inviteUrl?: string
}

const Member = mongoose.model('Member', memberSchema)

/**
 *
 * @param member Member to get
 * @returns mongoose model of the member
 */
export const GetMember = async (member: GuildMember) => {
  const dbMember = await Member.findOne({ id: member.id })
  return dbMember || CreateMember(member)
}

/**
 *
 * @param member Member to create
 * @param payload Payload to create the member with
 * @returns mongoose model of the member
 */
export const CreateMember = async (member: GuildMember, payload?: Payload) => {
  const dbMember = await Member.findOne({ id: member.id })

  if (!dbMember) {
    const newMember = new Member({
      id: member.id,
      xp: payload?.xp || 0,
      level: 0,
      inviteUrl: payload?.inviteUrl || null,
    })
    return await newMember.save()
  }

  return dbMember
}

/**
 *
 * @param member Member to give xp
 * @param xp Amount of xp to give
 * @returns Mongoose model of the member
 */
export const GiveXp = async (member: GuildMember, xp: number) => {
  const Member = await GetMember(member)

  if (!Member) return
  if (Member.xp === undefined) Member.xp = 0
  if (Member.level === undefined) Member.level = 0

  Member.xp += xp
  if (Member.xp >= 100) {
    Member.level += Math.floor(Member.xp / 100)
    Member.xp = Math.floor(Member.xp % 100)
    updateRoleByLevel(member, Member.level)
  }

  await Member.save()
}

export const CreateInviteForMember = async (member: GuildMember) => {
  const Member = await GetMember(member)
  const channel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID as string
  ) as TextChannel

  if (Member.inviteUrl) return Member.inviteUrl

  const inviteUrl = (
    await channel.createInvite({ maxAge: 604800, maxUses: 1, unique: true })
  ).url
  Member.inviteUrl = inviteUrl
  await Member.save()

  return inviteUrl || false
}
