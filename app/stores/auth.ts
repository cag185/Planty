import { defineStore } from 'pinia'

export interface User {
  id: number
  name: string
  email: string
  dateCreated: Date
  emailNotificationsEnabled: boolean
  dateDeleted: Date | null
  dateUpdated: Date
}

type ApiUser = {
  id: number
  name: string
  email: string
  date_created: string
  date_deleted: string | null
  date_updated: string
  enabled_email_notifications: boolean
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userInitial: (state) => state.user?.name?.charAt(0).toUpperCase() || '',
  },

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      try {
        const { apiBaseUrl } = useRuntimeConfig().public
        const response = await $fetch<{ token: string; user: ApiUser }>(`${apiBaseUrl}/users/login`, {
          method: 'POST',
          body: { email, password },
        })
        this.user = this.mapApiUserToStoreUser(response.user)
        this.token = response.token
        sessionStorage.setItem('planty_user', JSON.stringify(this.user))
        sessionStorage.setItem('planty_token', response.token)
        // Connect socket for real-time notifications
        const notificationsStore = useNotificationsStore()
        notificationsStore.connectSocket()
        return true
      } catch {
        return false
      }
    },

    async signup(name: string, email: string, password: string): Promise<boolean> {
      try {
        const { apiBaseUrl } = useRuntimeConfig().public
        const response = await $fetch<{ token: string; user: ApiUser }>(`${apiBaseUrl}/users/`, {
          method: 'POST',
          body: { name, email, password },
        })
        this.user = this.mapApiUserToStoreUser(response.user)
        this.token = response.token
        sessionStorage.setItem('planty_user', JSON.stringify(this.user))
        sessionStorage.setItem('planty_token', response.token)
        // Connect socket for real-time notifications
        const notificationsStore = useNotificationsStore()
        notificationsStore.connectSocket()
        return true
      } catch (error: any) {
        const message = error?.data?.error ?? 'Sign up failed. Please try again.'
        throw new Error(message)
      }
    },

    async updateSettings(emailNotificationsEnabled: boolean): Promise<boolean> {
      try {
        const {apiBaseUrl } = useRuntimeConfig().public
        const response = await $fetch<{ token: string, user: ApiUser }>(`${apiBaseUrl}/users/${this.user?.id}/update-settings`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: {
            emailNotificationsEnabled: emailNotificationsEnabled,
          },
        })
        this.user = this.mapApiUserToStoreUser(response.user)
        sessionStorage.setItem('planty_user', JSON.stringify(this.user))
        return true
      } catch {
        return false
      }
    },

    logout() {
      this.user = null
      this.token = null
      sessionStorage.removeItem('planty_user')
      sessionStorage.removeItem('planty_token')
      // Clear all user-specific stores
      const plantsStore = usePlantsStore()
      const notificationsStore = useNotificationsStore()
      notificationsStore.disconnectSocket()
      notificationsStore.clearNotifications()
      plantsStore.clearPlants()
    },

    handleAuthError(error: any) {
      if (error?.response?.status === 401) {
        this.logout()
        navigateTo('/login')
        return true
      }
      return false
    },

    restoreSession() {
      const stored = sessionStorage.getItem('planty_user')
      const token = sessionStorage.getItem('planty_token')
      if (stored && token) {
        try {
          const tokenParts = token.split('.')
          const encodedPayload = tokenParts[1]
          if (tokenParts.length !== 3 || !encodedPayload) {
            this.logout()
            return
          }
          const payload = JSON.parse(atob(encodedPayload))
          if (payload.exp * 1000 < Date.now()) {
            this.logout()
            return
          }
        } catch {
          this.logout()
          return
        }
        // Reconstruct the user data by running it back through the mapping function to ensure date fields are properly converted to Date objects and all expected fields are present.
        this.user = this.mapParsedJsonToFrontEndUser(JSON.parse(stored))
        this.token = token
        // Reconnect socket for real-time notifications
        const notificationsStore = useNotificationsStore()
        notificationsStore.connectSocket()
      }
    },

    mapParsedJsonToFrontEndUser(parsedUser: Partial<User>): User {
      return {
        id: parsedUser.id ?? 0,
        name: parsedUser.name ?? '',
        email: parsedUser.email ?? '',
        dateCreated: parsedUser.dateCreated ? new Date(parsedUser.dateCreated) : new Date(),
        dateUpdated: parsedUser.dateUpdated ? new Date(parsedUser.dateUpdated) : new Date(),
        dateDeleted: parsedUser.dateDeleted ? new Date(parsedUser.dateDeleted) : null,
        emailNotificationsEnabled: parsedUser.emailNotificationsEnabled ?? false,
      }
    },

    mapApiUserToStoreUser(apiUser: ApiUser): User {
      const frontEndUser: User = {
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        dateCreated: new Date(apiUser.date_created),
        dateUpdated: new Date(apiUser.date_updated),
        dateDeleted: apiUser.date_deleted ? new Date(apiUser.date_deleted) : null,
        emailNotificationsEnabled: !!apiUser.enabled_email_notifications,
      }
      return frontEndUser
    },
  },
})
