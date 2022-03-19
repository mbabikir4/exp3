//express import

const express = require('express');
const app = express();

// whatsapp import


const { Client, LocalAuth, NoAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

//files for real
const arabic = require('./lang/arabic');
const { mentionAll, todayFixMessage, standingIntro, StandingsMsg, goalScorersMsg } = require('./functions/whats');
const { standingCon, goalsCon } = require('./functions/conditionals');


const client = new Client({
    authStrategy: new LocalAuth()
});

// express work
// let isReady = "Not Yet";
// const port = process.env.PORT || 8080
// app.listen(port);
// app.set('view engine', 'ejs')
// app.get('/', (req,res) => {
//     res.render("index", {text: isReady})
// })


// whatsapp work

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});


});

client.on('ready', () => {
    console.log('Client is ready!');
    // isReady = "Ready";
    


});

client.initialize();

client.on('message', msg => {
    
	if(msg.body.includes(arabic.mention)) {
        mentionAll(msg,client,msg.reply);

    }
    else if(msg.body === arabic.todayMatches) {
        todayFixMessage(msg,client);
    }
    else if(msg.body === arabic.standingMsg) {
        standingIntro(msg);

    }
    else if(standingCon(msg.body).bool === true) {
        const number = standingCon(msg.body).number;
        StandingsMsg(msg,number);
    }
    else if(msg.body === arabic.horn) {
        msg.reply(arabic.reply.horn)
    }
    else if(msg.body === arabic.goalsMsg) {
        msg.reply(arabic.reply.goalsMsg);
    }
    else if(goalsCon(msg.body).bool === true) {
        const number = goalsCon(msg.body).number;
        goalScorersMsg(msg,number);
        
    }
    else if(msg.body === arabic.horn) {
        msg.reply(arabic.reply.horn)
    }
    else if(msg.body === arabic.love) {
        msg.reply(arabic.reply.love);
    }
    // else if(arabic.swear.indexOf(msg.body) > -1) {
    //    msg.reply('صمها بس');

    // }
    else if(msg.body === arabic.help) {
        msg.reply(arabic.reply.help)
    }
    else if(msg.body === 'فوت ١') {
        msg.reply('بكبك اكبر مهرج في الارض')
    }
    else if(msg.body === 'فوت ٢') {
        msg.reply('مصطفى مهرج + ميسي اكبر من باريس')
    }
});


