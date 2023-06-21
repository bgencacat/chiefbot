import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import mongoose from 'mongoose'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildPresences,
  ],
})

const fs = require('fs')
const path = require('path')

client.commands = new Collection()
client.cooldowns = new Collection()
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

require('./deploy-commands')

console.log('\nKomutlar yükleniyor...')
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
      console.log(command.data.name + ' komutu yüklendi.')
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      )
    }
  }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'))

console.log('\nOlaylar yükleniyor...')
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  console.log(event.name + ' olayı yüklendi.')
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log('MongoDB bağlantısı başarılı.')
    client.login(process.env.DISCORD_TOKEN)
  })

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
