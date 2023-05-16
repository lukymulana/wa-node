const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    // qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	console.log(message.body);

    const triger = message.body.substring(0, 4);
     
     if(triger === 'ping') {
        // Number where you want to send the message.
        const number = message.body.substring(5);

        // Your message.
        const text = "Test...";
    
        // Getting chatId from the number.
        // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
        const chatId = number + "@c.us";
    
        // Sending message.
        client.sendMessage(chatId, text);
	}
});

client.initialize();