import { defineStore } from 'pinia'

export type NotificationType = 'autonomous' | 'requirement'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  plantId?: string
  plantName?: string
  createdAt: string
  read: boolean
  completed: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as AppNotification[],
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
    sortedNotifications: (state) =>
      [...state.notifications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    autonomousNotifications(): AppNotification[] {
      return this.sortedNotifications.filter((n) => n.type === 'autonomous')
    },
    requirementNotifications(): AppNotification[] {
      return this.sortedNotifications.filter((n) => n.type === 'requirement')
    },
  },

  actions: {
    addNotification(data: {
      type: NotificationType
      title: string
      message: string
      plantId?: string
      plantName?: string
    }) {
      const notification: AppNotification = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
        read: false,
        completed: false,
      }
      this.notifications.push(notification)
      return notification
    },

    acknowledge(id: string) {
      const n = this.notifications.find((n) => n.id === id)
      if (n) {
        n.read = true
      }
    },

    markCompleted(id: string) {
      const n = this.notifications.find((n) => n.id === id)
      if (n) {
        n.completed = true
        n.read = true
      }
    },

    dismiss(id: string) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },

    clearAll() {
      this.notifications = []
    },

    markAllRead() {
      this.notifications.forEach((n) => (n.read = true))
    },

    // Demo helper: seed some sample notifications
    seedDemoNotifications(plantId: string, plantName: string) {
      this.addNotification({
        type: 'autonomous',
        title: 'Auto-watered',
        message: `${plantName} was automatically watered based on soil moisture readings.`,
        plantId,
        plantName,
      })
      this.addNotification({
        type: 'autonomous',
        title: 'Stats update',
        message: `Scheduled stat check complete for ${plantName}. Humidity: 65%, Temp: 72°F, Light: good.`,
        plantId,
        plantName,
      })
      this.addNotification({
        type: 'requirement',
        title: 'Watering needed',
        message: `${plantName} soil moisture is below 20%. Please water your plant soon.`,
        plantId,
        plantName,
      })
      this.addNotification({
        type: 'requirement',
        title: 'Temperature alert',
        message: `${plantName} environment temperature has exceeded 90°F. Consider moving the plant to a cooler area.`,
        plantId,
        plantName,
      })
    },
  },
})
