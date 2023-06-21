import { GuildMember } from 'discord.js'

const levelRoles = [
  { id: '1119246787471999017', level: 5 },
  { id: '1119247855329235059', level: 10 },
]
export const updateRoleByLevel = async (
  member: GuildMember,
  newLevel: number
) => {
  // get only highest level role from levelRoles array that is lower than newLevel
  const role = levelRoles
    .filter((role) => role.level <= newLevel)
    .sort((a, b) => b.level - a.level)[0]

  // if role is not found, return
  if (!role) return

  // if member already has the role, return
  // if member is admin or moderator, return

  if (
    member.roles.cache.has(role.id) ||
    member.roles.cache.has('1119066796910190665')
  )
    return

  // add the role to the member
  await member.roles.add(role.id)

  // remove all roles that are lower than the new role
  levelRoles
    .filter((role) => role.level < newLevel)
    .forEach((role) => {
      if (member.roles.cache.has(role.id)) {
        member.roles.remove(role.id)
      }
    })
}
