const moment = require("moment");
const arabic = require("../lang/arabic");
const { reply } = require("../lang/arabic");
const { getFixturesToday, getStandings, fetchTopScorers, fetchMatchData, fetchLiveScores } = require("./api");
const { matchEventCon } = require("./conditionals");


const mentionAll = async (msg, client) => {
  const chat = await msg.getChat();

  let text = "";
  let mentions = [];
  let participantX = {isAdmin: false, id: {user: '222'}};

  let admin = 'x';
  for (let participant of chat.participants) {
    if(participant.id.user == msg.author.split('@')[0]) {
      participantX = participant
    }
    const contact = await client.getContactById(participant.id._serialized);
    mentions.push(contact);
    text += `@${participant.id.user} `;
    // console.log("all in one:",participant.id_serialized === msg.author && participant.isAdmin === false)
   
  }
  
  if(participantX.id.user === msg.author.split('@')[0] && participantX.isAdmin == false) {
    msg.reply('منت ادمن صمها بس')
   
    
  }
  else if(participantX.isAdmin == true) {
    if(participantX.id.user == msg.author.split('@')[0]) {
      msg.reply(text, chat.id_serialized, { mentions });
    }
  
  }

  
};

const todayFixMessage = async (msg, client) => {
  const data = await getFixturesToday();
  const msgArr = await data.data.fixtures.map((obj) => {
    const time = moment(obj.time, "LTS").add("3", "h").format('h:mm');

    return `
${obj.home_name} ضد ${obj.away_name} 

الساعة: ${time} بتوقيت مكة المكرمة
             
الجولة : ${obj.round}

المكان: 
${obj.location}

        
        `;
  });
  const msgToStr = await msgArr.join('\n----------------------\n');
  if(data.data.fixtures.length == 0 ) {
    msg.reply('لا توجد مباريات مهمة اليوم')
  }
  else if(data.data.fixtures.length != 0) {
  msg.reply(msgToStr);

  }
};


const StandingsMsg = async (msg,id) => {
    const {data} = await getStandings(id);
    const {table} = await data;
    table.sort((a,b) => (Number(a.rank) - Number(b.rank)));

    const msgMap = table.map(obj => {

        return (
            `
النادي: ${obj.name}

المركز: ${obj.rank}

عدد النقاط: ${obj.points}

عدد المباريات الملعوبة: ${obj.matches}

فارق الاهداف: ${obj.goal_diff}

فاز: ${obj.won}

خسر: ${obj.drawn}

تعادل: ${obj.lost}
            `
        )
    });

    const ReplyMsg = msgMap.join('-------------------------');

    msg.reply(ReplyMsg);

}


const standingIntro = (msg) => {

    msg.reply(arabic.reply.standingMsg);
}


const goalScorersMsg = async (msg,comp_id) => {
    const data = await fetchTopScorers(comp_id);
    const {goalscorers} = await data.data;
    goalscorers.sort((a,b) => (Number(b.goals) - Number(a.goals)));
    const goalsMap = goalscorers.map(obj => {
        
        return (
            `
اللاعب:
${obj.name}

عدد الاهداف: ${obj.goals}

عدد الصناعات: ${obj.assists}


عدد المباريات الملعوبة: ${obj.played}

الفريق: 
${obj.team.name}

            
            `
        )
    });

    const goalsStr = goalsMap.join('-------------------------');
    msg.reply(goalsStr)


}


const getEventsMatch = async (msg) => {
  const {number} = matchEventCon(msg.body);
  const {data} = await fetchMatchData(number);
  data.event.sort((a,b) => (Number(b.sort) - Number(a.sort)));

  const arrEvents = data.event.map(obj => (
    `
الحدث: ${obj.event}
اللاعب: ${obj.player}
الوقت: ${obj.time}

    
    `
  ));

  const EventsMsg = arrEvents.join('--------------------------------');
  msg.reply(EventsMsg);



}


const getLiveMatches = async (msg) => {
  const {data} = await fetchLiveScores();
  const arrLive = data.match.map(obj => (`
${obj.home_name} ضد ${obj.away_name}
  
الوقت: ${obj.time}
  
النتيجة:
  
${obj.score}
  
كود المباراة: ${obj.fixture_id}
    
    `));


  const LiveAll = arrLive.join('---------------------------');
 if(data.match.length == 0) {
   msg.reply('لا توجد مباريات حاليا')
 }
 else if(data.match.length != 0) [
   msg.reply(LiveAll)
 ]
}


module.exports = { 
    mentionAll,
    todayFixMessage,
     StandingsMsg,
      standingIntro,
      goalScorersMsg,
      getEventsMatch,
      getLiveMatches,
      

      
    }
