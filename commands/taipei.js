import axios from 'axios'
// import { convertTWD97toWGS84 } from '../utils/xyTolatlon.js'

async function fetchAllTaipeiShelters() {
  const url =
    'https://data.taipei/api/v1/dataset/39ca53a1-c861-40bc-b329-fc9b28c10e01?scope=resourceAquire'
  const limit = 1000

  let all_results = []
  let offset = 0
  let hasMore = true

  while (hasMore) {
    try {
      const { data } = await axios.get(url, {
        params: {
          limit,
          offset,
        },
      })

      const results = data.result.results
      all_results = all_results.concat(results)

      // 回傳筆數少於limit 取完所有資料
      if (results.length < limit) {
        hasMore = false
      } else {
        offset += limit
      }

      // console.log(`已取得 ${results.length} 筆資料`)
    } catch (error) {
      console.error('獲取資料時發生錯誤:', error)
      break
    }
  }

  console.log(`總共取得 ${all_results.length} 筆台北市避難所資料`)

  // 轉換坐標並整理格式
  return all_results.map((value) => {
    // const { lat, lon } = convertTWD97toWGS84(Number(value['座標x']), Number(value['座標y']))
    return {
      name: value['場所名稱'],
      address: value['地址'],
      basement: value['地下層數位址'],
      capacity: Number(value['容納人數']),
      lat: Number(value['座標y']),
      lon: Number(value['座標x']),
    }
  })
}

export default async () => {
  const shelters = await fetchAllTaipeiShelters()

  return shelters
}
