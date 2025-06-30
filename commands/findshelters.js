import axios from 'axios'
import findFromTaipei from './taipei.js'

export default async (lat, lon) => {
  // 1. 取得城市和行政區名稱
  const loc = await getCity(lat, lon)

  console.log(`查詢位置: (${lat}, ${lon}), 位於${loc.city}, ${loc.district}`)

  // 2. 根據城市和行政區名稱，決定要使用哪個函式來查找收容所
  if (loc.city === '臺北市') {
    return findFromTaipei(lat, lon)
  }

  // 如果不是台北市，回傳空陣列或適當的訊息
  return []
}

async function getCity(lat, lng) {
  const url = 'https://nominatim.openstreetmap.org/reverse'
  try {
    const res = await axios.get(url, {
      params: { lat, lon: lng, format: 'json' },
      headers: { 'User-Agent': 'TaipeiShelterBot/1.0' },
    })
    const addr = res.data.address
    return { city: addr.city, district: addr.suburb || addr.city_district || '未知行政區' }
    // return addr.suburb || addr.city_district || '未知行政區'
  } catch (err) {
    console.error('逆地理失敗:', err)
    return '未知行政區'
  }
}
