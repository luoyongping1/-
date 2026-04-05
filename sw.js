self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

// 监听云端发来的推送请求
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: '书书小手机', body: '收到一条新消息' };
    
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3670/3670044.png',
        vibrate: [200, 100, 200],
        data: { url: '/' } 
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 点击通知回到网页
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});