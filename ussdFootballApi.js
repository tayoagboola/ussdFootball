var request = require('request-promise');
var config = require('config');
var stringbuilder ='';
const LEAGUE_ID_PREMIERSHIP_LEAGUE=2;

const HOST_NAME ='api-football-v1.p.rapidapi.com';
const  API_KEY =config.API_KEY;

var apiFootBall = {
 
  getfixturesFromLeague: function(leagueId) {
var apiResponse;
    var options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v2/fixtures/league/'+leagueId+'/2018-08-11',
        json:true,
        headers: {
            'x-rapidapi-host': HOST_NAME,
            'x-rapidapi-key': API_KEY
          }
      };
      apiResponse = request(options);
    return apiResponse;
  },

  getApiItems: function(apiResult) {
  return apiResult.api.fixtures;
    }


}

 exports.fixtureByLegue=function(leagueId) {
    return apiFootBall.getfixturesFromLeague(leagueId);
  }

