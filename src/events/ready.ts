import { Client, Events } from 'discord.js'

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`\n${client.user?.username} olarak görev başında kaptan!`)
  },
}
