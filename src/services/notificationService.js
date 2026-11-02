import { storageService } from './storageService';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';

export const notificationService = {
  getNotifications() {
    return storageService.get(storageService.KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  markAsRead(id) {
    const list = this.getNotifications();
    const updated = list.map(n => (n.id === id ? { ...n, read: true } : n));
    storageService.set(storageService.KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  markAllAsRead() {
    const list = this.getNotifications();
    const updated = list.map(n => ({ ...n, read: true }));
    storageService.set(storageService.KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  addNotification(notif) {
    const list = this.getNotifications();
    const newNotif = {
      ...notif,
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      read: false
    };
    const updated = [newNotif, ...list];
    storageService.set(storageService.KEYS.NOTIFICATIONS, updated);
    return newNotif;
  }
};
