export const convertTWD97toWGS84 = (x, y) => {
  // 以下為轉換程式碼（簡化版本）
  // 參考：https://github.com/jyggyg/twd97-to-wgs84-js
  const a = 6378137.0
  const b = 6356752.314245
  const lon0 = (121 * Math.PI) / 180 // central meridian
  const k0 = 0.9999
  const dx = 250000
  const dy = 0

  const e = Math.sqrt(1 - (b * b) / (a * a))
  const x_ = x - dx
  const y_ = y - dy

  let m = y_ / k0
  let mu =
    m / (a * (1 - Math.pow(e, 2) / 4 - (3 * Math.pow(e, 4)) / 64 - (5 * Math.pow(e, 6)) / 256))

  const e1 = (1 - Math.sqrt(1 - e * e)) / (1 + Math.sqrt(1 - e * e))
  let phi1 =
    mu +
    ((3 * e1) / 2 - (27 * Math.pow(e1, 3)) / 32) * Math.sin(2 * mu) +
    ((21 * e1 * e1) / 16 - (55 * Math.pow(e1, 4)) / 32) * Math.sin(4 * mu) +
    ((151 * Math.pow(e1, 3)) / 96) * Math.sin(6 * mu) +
    ((1097 * Math.pow(e1, 4)) / 512) * Math.sin(8 * mu)

  const c1 = Math.pow(e * Math.cos(phi1), 2) / (1 - e * e)
  const t1 = Math.tan(phi1) * Math.tan(phi1)
  const n1 = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi1), 2))
  const r1 = (a * (1 - e * e)) / Math.pow(1 - Math.pow(e * Math.sin(phi1), 2), 1.5)
  const d = x_ / (n1 * k0)

  let lat =
    phi1 -
    ((n1 * Math.tan(phi1)) / r1) *
      ((d * d) / 2 -
        ((5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * Math.pow(e, 2)) * Math.pow(d, 4)) / 24 +
        ((61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * Math.pow(e, 2) - 3 * c1 * c1) *
          Math.pow(d, 6)) /
          720)
  lat = (lat * 180) / Math.PI

  let lon =
    (d -
      ((1 + 2 * t1 + c1) * Math.pow(d, 3)) / 6 +
      ((5 - 2 * c1 + 28 * t1 - 3 * Math.pow(c1, 2) + 8 * Math.pow(e, 2) + 24 * Math.pow(t1, 2)) *
        Math.pow(d, 5)) /
        120) /
    Math.cos(phi1)
  lon = lon0 + lon
  lon = (lon * 180) / Math.PI

  return { lat, lon }
}
