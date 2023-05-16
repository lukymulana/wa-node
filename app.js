const express = require('express')
const app = express()
const cors = require("cors");
const port = 3000
const qrcode = require('qrcode-terminal');
var bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');
const client = new Client();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
  origin: "http://10.19.23.164"
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
    const text = `Hai ${req.body.nama}! Anda sudah ditunggu tamu, silahkan menuju lobby untuk bertemu tamu.`;

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text);
})

app.listen(port, '10.19.23.164',() => {
  console.log(`Example app listening on port ${port}`)
})

client.initialize();


