import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useSocket } from '~/composables/useSocket'

// Map the ids to the type.
export type NotificationType = Record<number, string>
// In the future this should be its own network call to fetch the types, but for now we can hardcode it since we only have 2 types.
export const notificationTypes: NotificationType = {
  1: 'update',
  2: 'requirement',
}

// Define a usable Notication class.
export class Notification {
  id: number
  dateCreated: string
  dateDeleted: string | null
  dateUpdated: string
  typeName: string
  userId: number
  plantId: number
  dateAcknowledged: string | null
  dateCompleted: string | null
  acknowledged: boolean
  completed: boolean
  title: string
  message: string

  constructor(data: any) {
    this.id = data.id;
    this.dateCreated = (data.date_created);
    this.dateDeleted = data.date_deleted ? (data.date_deleted) : null;
    this.dateUpdated = (data.date_updated);
    this.typeName = notificationTypes[data.notification_type_id] || 'unknown';
    this.userId = data.users_user_id;
    this.plantId = data.plant_id;
    this.dateAcknowledged = data.date_acknowledged ? (data.date_acknowledged) : null;
    this.dateCompleted = data.date_completed ? (data.date_completed) : null;
    this.acknowledged = data.acknowledged;
    this.completed = data.completed;
    this.title = data.title;
    this.message = data.message;
  }
}

// Define a notification interface.
export interface ApiNotification {
  id: number
  date_created: Date,
  date_deleted: Date | null,
  date_updated: Date,
  notification_type_id: number
  users_user_id: number
  plant_id: number
  date_acknowledged: Date | null
  date_completed: Date | null
  acknowledged: boolean
  completed: boolean
  title: string
  message: string
}

// Define a function to map the API response to the Notification class.
const mapApiNotification = (n: ApiNotification): Notification => {
  return {
    id: n.id,
    dateCreated: (n.date_created).toString(),
    dateDeleted: n.date_deleted ? (n.date_deleted).toString() : null,
    dateUpdated: (n.date_updated).toString(),
    typeName: notificationTypes[n.notification_type_id] || 'unknown',
    userId: n.users_user_id,
    plantId: n.plant_id,
    dateAcknowledged: n.date_acknowledged ? (n.date_acknowledged).toString() : null,
    dateCompleted: n.date_completed ? (n.date_completed).toString() : null,
    acknowledged: n.acknowledged,
    completed: n.completed,
    title: n.title,
    message: n.message,
  }
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
    // console.log('API Base URL:', BASE_URL())
    if (authStore.user == null) 
    {
      console.log('No user logged in, skipping notification fetch');
      return;
    }
    console.log('Fetching notifications for user:', authStore.user?.id);

    try {
      const data = await $fetch<ApiNotification[]>(`${BASE_URL()}/notifications/`,
        {
          headers: { authorization: `Bearer ${authStore.token}` },
          method: 'GET',
          query: { user_id: authStore?.user?.id },
        })
        console.log('Fetched notifications:', data);
      notifications.value = data.map(mapApiNotification).filter((n) => !n.completed);
      unreadCount.value = notifications.value.filter((n) => !n.acknowledged).length;
    } catch (error: any) {
      if (!authStore.handleAuthError(error)) throw error
    }
  }
  
  const updateNotifications = computed(() => {
    return notifications.value.filter((n) => n.typeName === 'update')
  });

  const requirementNotifications = computed((): Notification[] => {
    return notifications.value.filter((n) => n.typeName === 'requirement')
  });

  const markAsAcknowledged = async (notificationId: number) => {
    try {
      await $fetch(`${BASE_URL()}/notifications/acknowledge`, {
        headers: { authorization: `Bearer ${authStore.token}` },
        body: { notification_id: notificationId },
        method: 'POST',
      })
      await getNotifications()
    } catch (error: any) {
      if (!authStore.handleAuthError(error)) throw error
    }
  }

  const markAsCompleted = async (notificationId: number, isForWatering: boolean = false, plantId?: number) => {
    try {
      await $fetch(`${BASE_URL()}/notifications/complete`, {
        headers: { authorization: `Bearer ${authStore.token}` },
        body: { 
          notification_id: notificationId,
          isForWatering: isForWatering,
          plant_id: plantId, 
         },
        method: 'POST',
      })
      await getNotifications()
    } catch (error: any) {
      if (!authStore.handleAuthError(error)) throw error
    }
  }

  // @TODO - make another API endpoint for this.
  const markAllAcknowledged = async () => {
    try {
      await $fetch(`${BASE_URL()}/notifications/acknowledge-all`, {
        headers: { authorization: `Bearer ${authStore.token}` },
        body: { user_id: authStore.user?.id },
        method: 'POST',
      })
      await getNotifications()
    } catch (error: any) {
      if (!authStore.handleAuthError(error)) throw error
    }
  }

  // @TODO - make another API endpoint for this.
  const markAllCompleted = async () => {
    try {
      await $fetch(`${BASE_URL()}/notifications/complete-all`, {
        headers: { authorization: `Bearer ${authStore.token}` },
        body: { user_id: authStore.user?.id },
        method: 'POST',
      })
      await getNotifications()
    } catch (error: any) {
      if (!authStore.handleAuthError(error)) throw error
    }
  }

  const clearNotifications = () => 
  {
    notifications.value = [];
    unreadCount.value = 0;
  }

  // --- Socket.io real-time notifications ---
  const { connect, disconnect, onEvent, offEvent } = useSocket()

  const handleNewNotification = (raw: ApiNotification) => {
    const mapped = mapApiNotification(raw)
    // Only add non-completed notifications (matching existing filter logic)
    if (!mapped.completed) {
      notifications.value.unshift(mapped)
      if (!mapped.acknowledged) {
        unreadCount.value++
      }
    }
  }

  const connectSocket = () => {
    connect()
    onEvent<ApiNotification>('notification:new', handleNewNotification)
  }

  const disconnectSocket = () => {
    offEvent('notification:new', handleNewNotification as (...args: unknown[]) => void)
    disconnect()
  }

  return {
    notifications,
    unreadCount,
    updateNotifications,
    requirementNotifications,
    getNotifications,
    markAsAcknowledged,
    markAsCompleted,
    markAllAcknowledged,
    markAllCompleted,
    clearNotifications,
    connectSocket,
    disconnectSocket,
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
