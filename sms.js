module.exports = {
    sendTextMessage: function (client, toPhone, text) {
        client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: toPhone,
            body: text
        }).then((message) => console.log(`alert "${message.body}" fired!`));
    }
};
