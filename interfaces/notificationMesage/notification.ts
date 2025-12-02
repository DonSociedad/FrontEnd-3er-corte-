export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface NotificationContextType {
  notifications: Notification[];
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}