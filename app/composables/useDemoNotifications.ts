import demoNotifications from '~/data/demo-notifications.json'
import { useNotificationsStore } from '~/stores/notifications'

export function useDemoNotifications() {
  const store = useNotificationsStore()
  const timers: ReturnType<typeof setTimeout>[] = []

  function start() {
    stop()
    for (const entry of demoNotifications) {
      const timer = setTimeout(() => {
        store.addNotification({
          type: entry.type as 'autonomous' | 'requirement',
          title: entry.title,
          message: entry.message,
          plantName: entry.plantName,
        })
      }, entry.delaySeconds * 1000)
      timers.push(timer)
    }
  }

  function stop() {
    timers.forEach(clearTimeout)
    timers.length = 0
  }

  return { start, stop }
}
