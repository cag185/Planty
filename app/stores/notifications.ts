import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

// Map the ids to the type.
export type NotificationType = Record<number, string>
// In the future this should be its own network call to fetch the types, but for now we can hardcode it since we only have 2 types.
export const notificationTypes: NotificationType = {
  1: 'update',
  2: 'requirement',
}

// Define a notification class.
export interface Notification {
  id: number
  typeId: number
  title: string
  message: string
  plantId?: number
  userId?: number
  acknowledged: boolean
  dateAcknowledged?: Date
  completed: boolean
  dateCompleted?: Date
  dateCreated: Date
}

// Define the base URL for the API.
const BASE_URL = () => useRuntimeConfig().public.apiBaseUrl

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0);

  // Set the user auth store instance.
  const authStore = useAuthStore()

  // Get the user and then fetch notifications for that user from the API.
  const getNotifications = async () => {

    if (authStore.user == null) 
    {
      return;
    }

    const data = await $fetch<Notification[]>(`${BASE_URL()}/notifications?userId=${authStore?.user?.id}`,
      {
        headers: { authorization: `Bearer ${authStore.token}` },
        method: 'GET',
        query: { userId: authStore?.user?.id },
      })
    notifications.value = data;
    unreadCount.value = notifications.value.filter((n) => !n.acknowledged).length;
  }
  
  const updateNotifications = computed(() => {
    return notifications.value.filter((n) => n.typeId === 1)
  });

  const requirementNotifications = computed((): Notification[] => {
    return notifications.value.filter((n) => n.typeId === 2)
  });

  const markAsAcknowledged = async (notificationId: number) => {
    await $fetch(`${BASE_URL()}/notifications/${notificationId}/acknowledge`, {
      headers: { authorization: `Bearer ${authStore.token}` },
      method: 'POST',
    })
    await getNotifications()
  }

  const markAsCompleted = async (notificationId: number) => {
    await $fetch(`${BASE_URL()}/notifications/${notificationId}/complete`, {
      headers: { authorization: `Bearer ${authStore.token}` },
      method: 'POST',
    })
    await getNotifications()
  }

  // @TODO - make another API endpoint for this.
  const markAllAcknowledged = async () => {
    await $fetch(`${BASE_URL()}/notifications/acknowledge-all`, {
      headers: { authorization: `Bearer ${authStore.token}` },
      method: 'POST',
    })
    await getNotifications()
  }

  // @TODO - make another API endpoint for this.
  const markAllCompleted = async () => {
    await $fetch(`${BASE_URL()}/notifications/complete-all`, {
      headers: { authorization: `Bearer ${authStore.token}` },
      method: 'POST',
    })
    await getNotifications()
  }

  return {
    notifications,
    unreadCount,
    updateNotifications,
    requirementNotifications,
    getNotifications,
    markAsAcknowledged,
    markAsCompleted,
    markAllAcknowledged,  // @TODO - make another API endpoint for this.
    markAllCompleted,  // @TODO - make another API endpoint for this.
  }

});

    // Demo helper: seed some sample notifications
    // seedDemoNotifications(plantId: number, plantName: string) {
    //   this.addNotification({
    //     type: 'update',
    //     title: 'Auto-watered',
    //     message: `${plantName} was automatically watered based on soil moisture readings.`,
    //     plantId,
    //     userId: 1,
    //   })
    //   this.addNotification({
    //     type: 'update',
    //     title: 'Stats update',
    //     message: `Scheduled stat check complete for ${plantName}. Humidity: 65%, Temp: 72°F, Light: good.`,
    //     plantId,
    //     userId: 1,
    //   })
    //   this.addNotification({
    //     type: 'requirement',
    //     title: 'Watering needed',
    //     message: `${plantName} soil moisture is below 20%. Please water your plant soon.`,
    //     plantId,
    //     userId: 1,
    //   })
    //   this.addNotification({
    //     type: 'requirement',
    //     title: 'Temperature alert',
    //     message: `${plantName} environment temperature has exceeded 90°F. Consider moving the plant to a cooler area.`,
    //     plantId,
    //     userId: 1,
    //   })
    // },
