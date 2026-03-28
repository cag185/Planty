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
    addPlant(name: string, species: string) {
      const plant: Plant = {
        id: crypto.randomUUID(),
        name,
        species,
        addedAt: new Date().toLocaleDateString(),
        stats: null,
      }
      this.plants.push(plant)
      return plant
    },

    removePlant(id: string) {
      this.plants = this.plants.filter((p) => p.id !== id)
    },

    renamePlant(id: string, newName: string) {
      const plant = this.plants.find((p) => p.id === id)
      if (plant) {
        plant.name = newName
      }
    },

    updatePlantStats(id: string, stats: PlantStats) {
      const plant = this.plants.find((p) => p.id === id)
      if (plant) {
        plant.stats = stats
      }
    },
  },
})
