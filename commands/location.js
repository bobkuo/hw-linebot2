import findshelters from './findshelters.js'
import { distance } from '../utils/distance.js'
import { getStreetViewImage, getWalkingTime } from '../utils/getGoogle.js'

import template from '../templates/shelter.js'
import fs from 'fs'

export default async (event) => {
  try {
    const { latitude, longitude } = event.message

    // 1.
    const data = await findshelters(latitude, longitude)

    if (data.length === 0) {
      await event.reply('此地區暫無避難所資料 (目前只支援台北市)')
      return
    }

    // 2.
    const new_data = data
      .map((value) => {
        value.distance = distance(value.lat, value.lon, latitude, longitude, 'K')
        return value
      })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 3)

    // console.log(`距離排序後的避難所資料:`, new_data)

    // 3.
    const bubbles = await Promise.all(
      new_data.map(async (value, index) => {
        // 取得街景圖片
        const streetViewUrl = getStreetViewImage(value.lat, value.lon)

        console.log(`===== 處理第 ${index + 1} 個避難所: ${value.name} =====`)

        // console.log(`街景圖片 URL: ${streetViewUrl}`)

        // 取得步行時間（非同步呼叫）
        let walkingInfo = null
        walkingInfo = await getWalkingTime(latitude, longitude, value.lat, value.lon)

        const mapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${value.lat},${value.lon}/@${value.lat},${value.lon},15z/data=!3m1!4b1!4m2!4m1!3e2`

        // console.log(`Google Maps URL: ${mapsUrl}`)

        const bubble = template()

        // 設定街景圖片
        bubble.body.contents[0].url =
          streetViewUrl || 'https://via.placeholder.com/600x600?text=No+Street+View'
        bubble.body.contents[0].action.uri = mapsUrl

        // 設定避難所資訊
        // 名稱
        bubble.body.contents[2].contents[0].contents[0].contents[0].text = value.name || '名稱不明'

        // 地址
        bubble.body.contents[2].contents[0].contents[1].contents[0].contents[1].text =
          value.address || '地址不明'

        // 地下層資訊
        bubble.body.contents[2].contents[0].contents[1].contents[1].contents[0].contents[1].text =
          value.basement ? `地下${value.basement}樓` : '無地下層資訊'

        // 容納人數
        bubble.body.contents[2].contents[0].contents[1].contents[1].contents[1].contents[1].text = `${value.capacity?.toLocaleString() || '未知'} 人`

        // 距離
        bubble.body.contents[2].contents[0].contents[1].contents[2].contents[0].contents[1].text = `${value.distance.toFixed(2)} 公里`

        // 步行時間
        bubble.body.contents[2].contents[0].contents[1].contents[2].contents[1].contents[1].text =
          walkingInfo
            ? walkingInfo.durationValue > 60
              ? `${walkingInfo.duration} ${walkingInfo.isEstimated ? '(直線)' : ''}`
              : `約${walkingInfo.durationValue}秒 ${walkingInfo.isEstimated ? '(直線)' : ''}`
            : '無法計算'

        // 設定按鈕連結
        bubble.footer.contents[0].action.uri = mapsUrl

        return bubble
      }),
    )

    // console.log('Flex bubbles 生成')

    // fs.writeFileSync(
    //   './dump/shelter.json',
    //   JSON.stringify(
    //     {
    //       type: 'carousel',
    //       contents: bubbles,
    //     },
    //     null,
    //     2,
    //   ),
    // )

    // 發送 Flex Message
    const result = await event.reply({
      type: 'flex',
      altText: `附近最近的 ${new_data.length} 個避難所`,
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })

    // 5. 錯誤處理
    if (result.message) {
      await event.reply('發送避難所資訊時 發生錯誤')

      //如果是開發環境，而且傳送訊息錯誤時
      if (process.env.DEV === 'true') {
        fs.writeFileSync(
          './dump/shelter.json',
          JSON.stringify(
            {
              type: 'carousel',
              contents: bubbles,
            },
            null,
            2,
          ),
        )
      }
    }
  } catch (error) {
    console.error(error)
    await event.reply('發生錯誤')
  }
}
