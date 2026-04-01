self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});

// 新增：监听来自网页的消息发送请求
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const options = {
      body: event.data.body,
      icon: event.data.icon || 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
      vibrate: [100, 50, 100],
      data: { url: self.registration.scope }
    };
    event.waitUntil(
      self.registration.showNotification(event.data.title, options)
    );
  }
});

// 新增：点击通知后，自动打开或切回网页
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      if (windowClients.length > 0) {
        return windowClients[0].focus();
      }
      return clients.openWindow(event.notification.data.url);
    })
  );
});