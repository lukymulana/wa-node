var fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/portal2.incoe.astra.co.id/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/portal2.incoe.astra.co.id/fullchain.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const express = require('express')
const app = express()
const cors = require("cors");
const port = 3005
const qrcode = require('qrcode-terminal');
var bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');
const client = new Client({
			puppeteer: {
				args: ['--no-sandbox','--disable-setuid-sandbox'],
			}
		});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/start', (req, res) => {
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
        // console.log('QR RECEIVED', qr);
        res.send('Whatsapp is ready to scan!')
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    
})

app.post('/sendMessage/', (req, res) => {
    // res.send(req.params.id)
    // console.log(req.body);
    res.send(req.body.no_telpon);

    const number = req.body.no_telpon;

    // Your message.
    const text = `Hai ${req.body.nama}! Anda sudah ditunggu ${req.body.nama_tamu}, silahkan menuju lobby untuk bertemu dengan ${req.body.nama_tamu}.`;

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text);
})

app.post('/sendCustomMessage/', (req, res) => {
  // res.send(req.params.id)
  // console.log(req.body);
  res.send(req.body.no_telpon);

  const number = req.body.no_telpon;

  // Your message.
  const text = req.body.pesan;

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number + "@c.us";

  // Sending message.
  client.sendMessage(chatId, text);
})

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})

client.initialize();


