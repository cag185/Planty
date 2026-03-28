import { defineStore } from 'pinia'

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

export const usePlantsStore = defineStore('plants', {
  state: () => ({
    plants: [] as Plant[],
  }),

  getters: {
    plantCount: (state) => state.plants.length,
    getPlantById: (state) => (id: string) => state.plants.find((p) => p.id === id),
  },

  actions: {
    addPlant(name: string, species: string, wateringFrequency: string = 'Weekly') {
      const plant: Plant = {
        id: crypto.randomUUID(),
        name,
        species,
        wateringFrequency,
        notificationsEnabled: true,
        addedAt: new Date().toISOString(),
        stats: null,
      }
      this.plants.push(plant)
      return plant
    },

    removePlant(id: string) {
      this.plants = this.plants.filter((p) => p.id !== id)
    },

    updatePlant(id: string, data: { name?: string; species?: string; wateringFrequency?: string }) {
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
  },
})
