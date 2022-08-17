
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

for (let e of ['one']) {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: "client-"+e
    })
  });

  client.initialize();

  client.on('qr', qr => {
      qrcode.generate(qr, {small: true});
  });

  client.on('authenticated', (session) => {
    console.log('WHATSAPP WEB => Authenticated');
  });

  client.on('ready', async () => {
      console.log(client.info);
      console.log('Client is ready!');
  });

  client.on('message', message => {
    if(message.body === '!ping') {
      message.reply('pong');
    }
  });
}


