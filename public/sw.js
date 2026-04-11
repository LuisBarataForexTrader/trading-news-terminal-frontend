// Trading News Terminal — Service Worker for Push Notifications
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '🔴 Trading Alert';
  const body  = data.body  || 'High impact news';
  const url   = data.url   || '/';
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/assets/favicon/android-chrome-192x192.png',
      badge:'/assets/favicon/favicon-32x32.png',
      data: { url },
      requireInteraction: true,
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.openWindow(url));
});
