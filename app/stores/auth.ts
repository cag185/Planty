import { defineStore } from 'pinia'

export interface User {
  id: number
  name: string
  email: string
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
        const response = await $fetch<{ token: string; user: User }>(`${apiBaseUrl}/users/login`, {
          method: 'POST',
          body: { email, password },
        })
        this.user = response.user
        this.token = response.token
        sessionStorage.setItem('planty_user', JSON.stringify(response.user))
        sessionStorage.setItem('planty_token', response.token)
        return true
      } catch {
        return false
      }
    },

    async signup(name: string, email: string, password: string): Promise<boolean> {
      try {
        const { apiBaseUrl } = useRuntimeConfig().public
        await $fetch(`${apiBaseUrl}/users/`, {
          method: 'POST',
          body: { name, email, password },
        })
        return await this.login(email, password)
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
        this.user = JSON.parse(stored)
        this.token = token
      }
    },
  },
})
