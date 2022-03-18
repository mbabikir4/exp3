const moment = require("moment");
const arabic = require("../lang/arabic");
const { reply } = require("../lang/arabic");
const { getFixturesToday, getStandings, fetchTopScorers } = require("./api");

const mentionAll = async (msg, client) => {
  const chat = await msg.getChat();

  let text = "";
  let mentions = [];

  for (let participant of chat.participants) {
    const contact = await client.getContactById(participant.id._serialized);

    mentions.push(contact);
    text += `@${participant.id.user} `;
  }

  await msg.reply(text, chat.id_serialized, { mentions });
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

  await msg.reply(msgToStr);
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

module.exports = { 
    mentionAll,
    todayFixMessage,
     StandingsMsg,
      standingIntro,
      goalScorersMsg
    };
