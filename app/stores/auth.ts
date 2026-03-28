import { defineStore } from 'pinia'

export interface User {
  firstName: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userInitial: (state) => state.user?.firstName?.charAt(0).toUpperCase() || '',
  },

  actions: {
    login(email: string, _password: string) {
      // Stub: in the future this will call an API
      // For now, check if a user was previously "signed up" in this session
      const stored = sessionStorage.getItem('planty_user')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.email === email) {
          this.user = parsed
          return true
        }
      }
      return false
    },

    signup(firstName: string, email: string, _password: string) {
      // Stub: in the future this will call an API
      const user: User = { firstName, email }
      sessionStorage.setItem('planty_user', JSON.stringify(user))
      this.user = user
      return true
    },

    logout() {
      this.user = null
      sessionStorage.removeItem('planty_user')
    },

    restoreSession() {
      const stored = sessionStorage.getItem('planty_user')
      if (stored) {
        this.user = JSON.parse(stored)
      }
    },
  },
})
