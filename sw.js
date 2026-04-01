// sw.js 增强保活版
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 监听消息通知
self.addEventListener('message', (event) => {
    if (event.data.type === 'SHOW_NOTIFICATION') {
        const title = event.data.title || '新消息';
        const options = {
            body: event.data.body,
            icon: event.data.icon || 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
            badge: event.data.icon,
            vibrate: [200, 100, 200],
            data: { url: event.source.url }
        };
        event.waitUntil(self.registration.showNotification(title, options));
    }
});

// 点击通知回到App
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});