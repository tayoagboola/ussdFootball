const UssdMenu = require('ussd-menu-builder');
const ussdFootball = require('ussdFootballApi');
const LEAGUE_ID_PREMIERSHIP_LEAGUE=2;
const LEAGUE_ID_LALIGA =11;
const LEAGUE_ID_SERIES_A=6;
const LEAGUE_ID_CHAMPIONSHIP=3;
// https://www.npmjs.com/package/ussd-menu-builder
exports.handler = (event, context, callback) => {
    
    const menu = new UssdMenu();
let args = {
        phoneNumber: event.phoneNumber,
        sessionId: event.sessionId,
        serviceCode: event.serviceCode,
        text: event.text
    };
// Define menu states
    let startState = {
        run: () => {
            // use menu.con() to send response without terminating session      
            menu.con('Welcome to Live Scores powered by Bet9ja' + 
                '\n--------------' +
                '\n1. Live Score' +
                '\n2. Premiership (EPL)' +
                '\n3. La Liga' +
                '\n4. Serie A' +
                '\n0. Exit');
        },
        // next object links to next state based on user input
        next: {
            '1': 'live_score',
            '2': 'premiership',
            '3': 'la_liga',
            '4': 'serie_a',
            '0': 'exit'
        }
    }
    
    menu.startState(startState);
    menu.state('start', startState);


    menu.state('live_score', {
        run: () => {
            // use menu.con() to send response without terminating session      
            menu.con('Live scores  \n' + 
                '\n--------------' +
                '\n9. Back' +
                '\n0. Exit');
        },
        // next object links to next state based on user input
        next: {
            '9': 'start',
            '0': 'exit'
        }
});


menu.state('premiership', {
    run: () => {
        // use menu.con() to send response without terminating session    
        formatReply(LEAGUE_ID_PREMIERSHIP_LEAGUE).then(function(result) {
            var resultArray = result.api.fixtures;
            var stringreply = getLoopItems(resultArray);
        
            //build the msenu in here.with the stringreply.

            menu.con('Premiership (EPL)' + 
            '\n' +
            stringreply+
            '\n9. Back' +
            '\n0. Exit');
        
          });
        
       
    },
    // next object links to next state based on user input
    next: {
        '9': 'start',
        '0': 'exit'
    }
});

menu.state('la_liga', {
    run: () => {
        // use menu.con() to send response without terminating session    
        formatReply(LEAGUE_ID_LALIGA).then(function(result) {
            var resultArray = result.api.fixtures;
            var stringreply = getLoopItems(resultArray);
        
            //build the msenu in here.with the stringreply.

            menu.con('La Liga ' + 
            '\n' +
            stringreply+
            '\n9. Back' +
            '\n0. Exit');
        
          });
    },
    // next object links to next state based on user input
    next: {
        '9': 'start',
        '0': 'exit'
    }
});

menu.state('serie_a', {
    run: () => {
        // use menu.con() to send response without terminating session      
        formatReply(LEAGUE_ID_SERIES_A).then(function(result) {
            var resultArray = result.api.fixtures;
            var stringreply = getLoopItems(resultArray);
        
            //build the msenu in here.with the stringreply.

            menu.con('Series A' + 
            '\n' +
            stringreply+
            '\n9. Back' +
            '\n0. Exit');
        
          });
    },
    // next object links to next state based on user input
    next: {
        '9': 'start',
        '0': 'exit'
    }
});


    
    menu.state('exit', {
        run: () => {
            menu.end('Thank you. Goodbye.');
        }
    });
menu.run(args, resMsg => {
        console.log(resMsg)
        callback(null, resMsg);
    });
};

function formatReply(legueId) {

    //gets the fixture object for api fesult
    return  ussdFootball.fixtureByLegue(legueId).
   then(ussdFootball.getApiItems)

}   

function getLoopItems(element) {
    var retunString = '';
    var i;
     for (i=0;i<element.length;i++){
          retunString += element[i].homeTeam.team_name+'('+element[i].goalsHomeTeam+') VS '+element[i].awayTeam.team_name+' ('+element[i].goalsAwayTeam+')\n';
     } 
       return retunString;
    }