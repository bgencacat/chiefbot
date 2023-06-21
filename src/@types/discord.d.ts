// extend discord.js's Client class with a commands property

import { Client, Collection, GatewayIntentBits } from 'discord.js'

declare module 'discord.js' {
  interface Client {
    commands: Collection<any, any>
    cooldowns: Collection<any, any>
  }
}
