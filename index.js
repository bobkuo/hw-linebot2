import 'dotenv/config'
import linebot from 'linebot'

import { commandQrLoc, commandQrNews, commandQrHandle } from './commands/qr.js'
import commandPb from './commands/postback.js'
import commandLoc from './commands/location.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text === '附近避難所') {
      commandQrLoc(event)
    } else if (event.message.text === '最新消息') {
      commandQrNews(event)
    } else if (event.message.text === '緊急應變') {
      commandQrHandle(event)
    } else {
      await event.reply('請開啟『更多資訊』選單，來獲取相關資訊。')
    }
  } else if (event.message.type === 'location') {
    commandLoc(event)
  }
})

bot.on('postback', async (event) => {
  commandPb(event)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
