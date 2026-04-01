self.addEventListener('fetch', function(event) {
  // 这是一个最简单的空服务工作线程，足以满足安装要求
  event.respondWith(fetch(event.request));
});