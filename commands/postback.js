export default async (event) => {
  const baseUrl = 'https://raw.githubusercontent.com/bobkuo/emergency-images/main'

  if (event.postback.data === '地震應急') {
    await sendMultipleImages(event, baseUrl, ['/1.png', '/9.png'], '地震時該做什麼')
  } else if (event.postback.data === '火災應急') {
    await sendMultipleImages(event, baseUrl, ['/2.png', '/8.png'], '火災時該做什麼')
  } else if (event.postback.data === '防空避難') {
    await sendMultipleImages(event, baseUrl, ['/3.png', '/7.png'], '防空避難時該做什麼')
  }
}

async function sendSingleImage(event, baseUrl, imgPath) {
  try {
    const imageUrl = `${baseUrl}${imgPath}`

    await event.reply({
      type: 'image',
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl,
    })
  } catch (error) {
    console.error(error)
    await event.reply(error.message || '圖片載入失敗')
  }
}

//
async function sendMultipleImages(event, baseUrl, imgPaths, altText) {
  try {
    const bubbles = imgPaths.map((imgPath) => {
      const imageUrl = `${baseUrl}${imgPath}`

      return {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'image',
              url: imageUrl,
              size: 'full',
              aspectMode: 'fit',
              aspectRatio: '2:3',
              gravity: 'center',
            },
          ],
          paddingAll: '0px',
          backgroundColor: '#000000',
        },
      }
    })

    await event.reply({
      type: 'flex',
      altText: altText,
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })
  } catch (error) {
    console.error(error)
    await event.reply(error.message || '圖片載入失敗')
  }
}
