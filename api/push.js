const webpush = require('web-push');

// 填入你的密钥
const publicVapidKey = 'BCukyNwnBw2K1QOkCzYIo4PECO9IBh-PTAH6XkBzsGo9yVjKkd2rMNq5FBOGrrT1wd36rOIFTnOP44uh6fG1GPU';
const privateVapidKey = 'mPq9Ky2M45D9d0wTdpL6J9OQD1iSC9myC_7Qxew_OeM';

webpush.setVapidDetails(
  'mailto:shushu@example.com', // 随便填个邮箱即可
  publicVapidKey,
  privateVapidKey
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subscription, title, body } = req.body;

    const payload = JSON.stringify({ title, body });

    webpush.sendNotification(subscription, payload)
      .then(() => res.status(201).json({ success: true }))
      .catch(error => {
        console.error('Push Error:', error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(405).send('只支持 POST 请求');
  }
}
