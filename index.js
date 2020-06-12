const UssdMenu = require('ussd-menu-builder');
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
            menu.con('Welcome to Live Scores powered by Benjamin ' + 
                '\n--------------' +
                '\n1. Live Score' +
                '\n2. Premiership (EPL)' +
                '\n3. La Liga' +
                '\n4.Serie A' +
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
            menu.con('Live scores ' + 
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
        menu.con('Premiership (EPL) ' + 
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

menu.state('la_liga', {
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('La liga ' + 
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

menu.state('serie_a', {
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Serie A ' + 
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
