export default defineEventHandler((event) => {
  // Mock API that returns randomized plant stats
  // In production, this would connect to real sensors/APIs
  const stats = {
    humidity: Math.round(40 + Math.random() * 40),           // 40-80%
    temperature: Math.round(18 + Math.random() * 12),         // 18-30°C
    soilMoisture: Math.round(20 + Math.random() * 60),        // 20-80%
    lightLevel: Math.round(200 + Math.random() * 800),        // 200-1000 lux
    lastWatered: getRandomLastWatered(),
    healthScore: Math.round(50 + Math.random() * 50),         // 50-100
  }

  return stats
})

function getRandomLastWatered(): string {
  const hoursAgo = Math.floor(Math.random() * 72)
  const date = new Date(Date.now() - hoursAgo * 60 * 60 * 1000)
  return date.toLocaleString()
}
