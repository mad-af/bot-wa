
const sheetApi = require("./sheet.js");
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

let availableNumbers = [] 
const getAvailableNumbers = async () => {
  const hasil = (await sheetApi()).availableNumbers;
  availableNumbers = hasil ? hasil.map(value => value[0]) : [];
};
getAvailableNumbers();

function isNumberExist(number) {
  for (const existNumber of availableNumbers) {
    // console.log(existNumber, number);
    if (existNumber === number) {
      // console.log(existNumber, number);
      return true;
    }
  }
}

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

  client.on('message', async (message) => {
    const name = message._data.notifyName;
    const number = message.from.replace('@c.us','');
    if(!isNumberExist(number)){
      (await sheetApi()).setRows(name, number);
      console.log('Berhasil menambahkan nomer');
    }
    console.log(availableNumbers);
    // console.log(name, number);

    const rows = (await sheetApi()).getRows;
    for (const row of rows) {
      if(message.body === row[0]) {
        message.reply(''+row[1]);
      }
    }
    getAvailableNumbers();
    // console.log(rows);
  });
}


