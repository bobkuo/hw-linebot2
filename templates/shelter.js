export default () => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://via.placeholder.com/600x600?text=Street+View',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '1:1',
          gravity: 'center',
          action: {
            type: 'uri',
            uri: 'https://www.google.com/maps',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          position: 'absolute',
          background: {
            type: 'linearGradient',
            angle: '0deg',
            endColor: '#00000000',
            startColor: '#00000099',
          },
          width: '100%',
          height: '50%',
          offsetBottom: '0px',
          offsetStart: '0px',
          offsetEnd: '0px',
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: '避難所名稱',
                      size: 'xl',
                      color: '#ffffff',
                      weight: 'bold',
                      wrap: true,
                      align: 'center',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      contents: [
                        {
                          type: 'text',
                          text: '📍',
                          color: '#ffffff',
                          size: 'sm',
                          flex: 0,
                        },
                        {
                          type: 'text',
                          text: '地址資訊',
                          color: '#ffffff',
                          size: 'sm',
                          wrap: true,
                          flex: 1,
                        },
                      ],
                      spacing: 'sm',
                    },
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '🏢',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 0,
                            },
                            {
                              type: 'text',
                              text: '地下層資訊',
                              color: '#ffffff',
                              size: 'sm',
                              wrap: true,
                              flex: 1,
                            },
                          ],
                          spacing: 'sm',
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '👥',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 0,
                            },
                            {
                              type: 'text',
                              text: '容納人數',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 1,
                            },
                          ],
                          spacing: 'sm',
                          flex: 1,
                        },
                      ],
                      spacing: 'lg',
                    },
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '📏',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 0,
                            },
                            {
                              type: 'text',
                              text: '直線距離',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 1,
                            },
                          ],
                          spacing: 'sm',
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '🚶‍♂️',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 0,
                            },
                            {
                              type: 'text',
                              text: '步行時間',
                              color: '#ffffff',
                              size: 'sm',
                              flex: 1,
                            },
                          ],
                          spacing: 'sm',
                          flex: 1,
                        },
                      ],
                      spacing: 'lg',
                    },
                  ],
                  spacing: 'xs',
                },
              ],
              spacing: 'xs',
            },
          ],
          position: 'absolute',
          offsetBottom: '0px',
          offsetStart: '0px',
          offsetEnd: '0px',
          paddingAll: '20px',
        },
      ],
      paddingAll: '0px',
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          style: 'primary',
          height: 'sm',
          action: {
            type: 'uri',
            label: '🗺️ 步行導航',
            uri: 'https://www.google.com/maps',
          },
        },
      ],
      paddingAll: '0px',
    },
  }
}
