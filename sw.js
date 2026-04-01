self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const options = {
      body: event.data.body,
      icon: event.data.icon || 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
      tag: 'msg-' + Date.now(), 
      renotify: true,
      badge: 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
      vibrate: [200, 100, 200],
      data: { url: self.registration.scope }
    };
    event.waitUntil(
      self.registration.showNotification(event.data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // 检查是否已经打开了网页，如果有就切回去
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.includes(event.notification.data.url) && 'focus' in client) {
          return client.focus();
        }
      }
      // 如果没打开，就新开一个
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});