const persianJs = require("persianjs");

const standingCon = (body) => {
  const bool = body == "دوري ٢" || body == "دوري ١" || body == "دوري ٤" || body == "دوري ٥" || body == "دوري ٣" || body == "دوري ٣١٣" ? true : false;
  const split = body.split(' ');
  const number = persianJs(split[1]).toEnglishNumber().toString();
  
  return {
    bool,
    number,

};

};
const goalsCon = (body) => {
  const bool = body == "هدافين ٢" || body == "هدافين ١" || body == "هدافين ٤" || body == "هدافين ٥" || body == "هدافين ٣"  ? true : false;
  const split = body.split(' ');
  const number = persianJs(split[1]).toEnglishNumber().toString();
  return {
    bool,
    number,

};

};
const matchEventCon = (body) => {
  
  const split = body.split(' ');
  const bool =  split.body[0] === 'مباراة'
  const number = persianJs(split[1]).toEnglishNumber().toString();
  return {
    bool,
    number,

};

};


const isAdmin = (msg) => {

}

// const returnName = (id) => {
//     switch (id) {
//         case '2':
//             return 'الدوري الانجليزي'
//             break;
//         case '1':
//           return 'الدوري الالماني'
        
//     }
// }

module.exports = {
    standingCon,
    goalsCon,
    matchEventCon,
    


}