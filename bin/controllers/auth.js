module.exports = class {
  constructor(app) {
    this.app = app
  }

  async server() {
    await this.app.get('/auth/login', this.login);
  }

  login = async (req, res) => {

    const { Client } = require('whatsapp-web.js');

    const client = new Client();

    let qre = ''
    new Promise((resolve, reject) => {
      client.on('qr', (qr) => {
        console.log(qr)
        qre = qr
      })
    });
    
    // client.on('ready', () => {
    //   console.log('Client is ready!');
    // });
    console.log(qre)

    // client.on('message', msg => {
    //   if (msg.body == '!ping') {
    //     msg.reply('pong');
    //   }
    // });

    client.initialize();
    res.render('index', {qre});
  }
}