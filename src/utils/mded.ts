import { ColorResolvable, Embed, EmbedBuilder } from 'discord.js'
import fs from 'node:fs'

export default (filePath: string) => {
  const embeds: EmbedBuilder[] = []
  const file = fs.readFileSync(filePath, 'utf8')
  const split = file.split('---')
  split.forEach((element: string) => {
    let text = element.match(/#(.*)/)
    if (!text) return

    let title = text[0]
    let color = title?.match(/\(([^)]+)\)/)?.[1]
    let description = element.split(title)[1].replace(`(${color})`, '')

    title = title?.replace('# ', '').replace(`(${color})`, '')

    const embed = new EmbedBuilder()
      .setColor(('#' + (color ?? '000000')) as ColorResolvable)
      .setDescription(description)

    if (title) embed.setTitle(title)

    embeds.push(embed)
  })

  return embeds
}
