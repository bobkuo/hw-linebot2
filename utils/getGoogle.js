import axios from 'axios'
import { distance } from './distance.js'

export function getStreetViewImage(lat, lng) {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error('缺少 GOOGLE_MAPS_API_KEY')
    return null
  }

  return `https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=${process.env.GOOGLE_MAPS_API_KEY}`
}

export async function getWalkingTime(startLat, startLng, endLat, endLng) {
  // 如果兩點距離小於1公里，直接估算時間
  const distanceKm = distance(startLat, startLng, endLat, endLng)

  if (distanceKm < 1) {
    console.log(`兩點距離 ${distanceKm} 公里，使用估算時間`)
    return estimateWalkingTime(distanceKm)
  }

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error('缺少 GOOGLE_MAPS_API_KEY')
    return estimateWalkingTime(distanceKm)
  }

  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json'
    const { data } = await axios.get(url, {
      params: {
        origin: `${startLat},${startLng}`,
        destination: `${endLat},${endLng}`,
        mode: 'walking',
        language: 'zh-TW',
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    })

    console.log('Google Directions API 回傳:', data)
    if (data.status === 'OK' && data.routes && data.routes.length > 0) {
      const route = data.routes[0]
      const leg = route.legs[0]
      return {
        duration: leg.duration.text, // "15 分鐘"
        distance: leg.distance.text, // "1.2 公里"
        durationValue: leg.duration.value, // 900 (秒)
        isEstimated: false,
      }
    }
  } catch (error) {
    console.error('取得步行時間失敗:', error)
    // 使用估算時間
    return estimateWalkingTime(distanceKm)
  }
}

function estimateWalkingTime(distanceKm) {
  const walkingSpeedKmh = 5 // 平均步行速度 5 km/h
  const timeHours = distanceKm / walkingSpeedKmh
  const timeMinutes = Math.round(timeHours * 60)

  return {
    duration: `約 ${timeMinutes} 分鐘`,
    distance: `${distanceKm.toFixed(1)} 公里`,
    durationValue: timeMinutes * 60, // 轉換為秒
    isEstimated: true,
  }
}
