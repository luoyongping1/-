self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const options = {
      body: event.data.body,
      icon: event.data.icon,
      // tag 属性可以让相同好友的消息合并，不同好友的消息堆叠
      tag: event.data.title, 
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
      // 如果网页开着就切回去，没开就新开一个
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(event.notification.data.url);
    })
  );
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