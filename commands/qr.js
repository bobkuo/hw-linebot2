export const commandQrLoc = async (event) => {
  await event.reply({
    type: 'text',
    text: '請傳送你所在的位置，或點擊下方按鈕傳送位置',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'uri',
            uri: 'line://nv/location',
            label: '📍 傳送位置',
          },
        },
      ],
    },
  })
}

export const commandQrNews = async (event) => {
  await event.reply({
    type: 'text',
    text: '請選擇發布單位',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'uri',
            label: '中央氣象署（CWA）',
            uri: 'https://www.cwa.gov.tw/V8/C/',
          },
        },
        {
          type: 'action',
          action: {
            type: 'uri',
            label: '內政部消防署（NFA）',
            uri: 'https://www.nfa.gov.tw/cht/index.php?code=list&ids=3',
          },
        },
        {
          type: 'action',
          action: {
            type: 'uri',
            label: '國家災害防救科技中心（NCDR）',
            uri: 'https://www.ncdr.nat.gov.tw/Message?itemid=57&mid=70',
          },
        },
      ],
    },
  })
}

export const commandQrHandle = async (event) => {
  await event.reply({
    type: 'text',
    text: '發生了什麼緊急狀況？\n請選擇以下選項',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '地震',
            // 傳去 postback 事件的資料
            data: '地震應急',
            // 選填，使用者傳送出的文字
            // displayText: '測試 postback',
          },
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '火災',
            data: '火災應急',
          },
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: '防空避難',
            data: '防空避難',
          },
        },
      ],
    },
  })
}
