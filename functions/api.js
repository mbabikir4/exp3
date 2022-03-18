const { default: axios } = require("axios");

const key = "BmUj6H5xdUg6ETLC";
const secret = "LmfZG4z3QZsacSSOeN7kucSI68PL1BoM";


const soccer = axios.create({
    baseURL: 'https://livescore-api.com/api-client',
    params: {
        key : key,
        secret: secret,
        lang: 'ar',


    }
});


const getFixturesToday = async () => {
    const res = await soccer.get('/fixtures/matches.json',{
        params: {
            competition_id: '2,244,245,243,223,1,4,3,5,313,315,152,334,333,179',
            date: 'today',
        } 
    })
    const data = await res.data;

    return data;

}

const getStandings = async (id) => {
    const res = await soccer.get('/leagues/table.json', {
        params: {
            competition_id: id,
            
        }
    });

    const data = await res.data;

    return data;


};


const fetchTopScorers = async (comp_id) => {
    const res = await soccer.get('/competitions/goalscorers.json', {
        params: {
            competition_id: comp_id,
        }

    });
    const data = await res.data

    return data;


}







module.exports = {
    getFixturesToday,
    getStandings,
    fetchTopScorers,


}



