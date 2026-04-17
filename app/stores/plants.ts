import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export interface PlantStats {
  humidity: number
  temperature: number
  soilMoisture: number
  lightLevel: number
  lastWatered: string
  healthScore: number
}

export interface Plant {
  id: string
  name: string
  species: string
  wateringFrequency: string
  notificationsEnabled: boolean
  addedAt: string
  stats: PlantStats | null
}

interface ApiPlant {
  id: number
  name: string
  species: string
  watering_frequency_days: number
  date_created: string
  date_updated: string
  date_deleted: string | null
}

const BASE_URL = () => useRuntimeConfig().public.apiBaseUrl

function wateringFrequencyToDays(freq: string): number {
  if (freq === 'Daily') return 1
  if (freq === 'Every 2-3 days') return 2
  if (freq === 'Weekly') return 7
  if (freq === 'Bi-weekly') return 14
  if (freq === 'Monthly') return 30
  const match = freq.match(/\d+/)
  return match ? parseInt(match[0]) : 7
}

function daysToWateringFrequency(days: number): string {
  if (days === 1) return 'Daily'
  if (days <= 3) return 'Every 2-3 days'
  if (days === 7) return 'Weekly'
  if (days === 14) return 'Bi-weekly'
  if (days >= 28 && days <= 31) return 'Monthly'
  return `Every ${days} days`
}

function mapApiPlant(p: ApiPlant): Plant {
  return {
    id: p.id.toString(),
    name: p.name,
    species: p.species,
    wateringFrequency: daysToWateringFrequency(p.watering_frequency_days),
    notificationsEnabled: true,
    addedAt: p.date_created,
    stats: null,
  }
}

export const usePlantsStore = defineStore('plants', {
  state: () => ({
    plants: [] as Plant[],
  }),

  getters: {
    plantCount: (state) => state.plants.length,
    getPlantById: (state) => (id: string) => state.plants.find((p) => p.id === id),
  },

  actions: {
    async fetchPlants() {
      const auth = useAuthStore()
      if (!auth.user || !auth.token) {
        console.log('No user logged in, skipping plant fetch');
        return;
      }
      const data = await $fetch<ApiPlant[]>(`${BASE_URL()}/plants/user/`, {
        headers: { Authorization: `Bearer ${auth.token}` },
        method: 'GET',
        query: { user_id: auth.user.id },
      })
      this.plants = data.map(mapApiPlant)
    },

    async addPlant(name: string, species: string, wateringFrequency: string = 'Weekly', userId?: number) {
      const auth = useAuthStore()
      const data = await $fetch<ApiPlant>(`${BASE_URL()}/plants/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` },
        body: { name, species, watering_frequency_days: wateringFrequencyToDays(wateringFrequency), user_id: userId },
      })
      const plant = mapApiPlant(data)
      this.plants.push(plant)
      return plant
    },

    async removePlant(id: string) {
      const auth = useAuthStore()
      await $fetch(`${BASE_URL()}/plants/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      this.plants = this.plants.filter((p) => p.id !== id)
    },

    async updatePlant(id: string, data: { name?: string; species?: string; wateringFrequency?: string }) {
      const auth = useAuthStore()
      const body: Record<string, unknown> = {}
      if (data.name !== undefined) body.name = data.name
      if (data.species !== undefined) body.species = data.species
      if (data.wateringFrequency !== undefined) body.watering_frequency_days = wateringFrequencyToDays(data.wateringFrequency)
      await $fetch(`${BASE_URL()}/plants/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${auth.token}` },
        body,
      })
      const plant = this.plants.find((p) => p.id === id)
      if (plant) {
        if (data.name !== undefined) plant.name = data.name
        if (data.species !== undefined) plant.species = data.species
        if (data.wateringFrequency !== undefined) plant.wateringFrequency = data.wateringFrequency
      }
    },

    updatePlantStats(id: string, stats: PlantStats) {
      const plant = this.plants.find((p) => p.id === id)
      if (plant) {
        plant.stats = stats
      }
    },

    toggleNotifications(id: string) {
      const plant = this.plants.find((p) => p.id === id)
      if (plant) {
        plant.notificationsEnabled = !plant.notificationsEnabled
      }
    },

    clearPlants() {
      this.plants = []
    }
  },
})
