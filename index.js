const telnet = require('telnet'),
    moment = require('moment');

telnet.createServer(function (client) {
    // make unicode characters work properly
    client.do.transmit_binary();
    // make the client emit 'window size' events
    client.do.window_size();
    // listen for the window size events from the client
    client.on('window size', function (e) {
        if (e.command === 'sb') {
            //console.log('telnet window resized to %d x %d', e.width, e.height);
        }
    });
    // listen for the actual data from the client
    client.on('data', b => {
        let data = b.toString().trim();
        console.log('%s: %s', client.input.remoteAddress, data);
        if ('exit' == data || 'logout' == data) {
            console.log('%s logged out', client.input.remoteAddress);
            client.destroy();
            return;
        }
        if (!client.login) {
            client.login = data;
            console.log('%s: password:', client.input.remoteAddress);
            client.write('password: ');
            return;
        }
        if (!client.password) {
            client.password = data;
        }
        if (!client.motd) {
            client.motd = true;
            console.log(
                '%s: Welcome to the SCALE system. The current time is %s\n',
                client.input.remoteAddress,
                moment().format('YYYY-MM-DD hh:mm:ss')
            );
            client.write(
                'Welcome to the SCALE system. The current time is '+
                moment().format('YYYY-MM-DD hh:mm:ss') +
                '\nUnauthorised access to this service is prohibited.\n'
            );
        }

        console.log('%s: $', client.input.remoteAddress);
        client.write('$ ');
    });
    console.info('new client from %s', client.input.remoteAddress);
    console.log('%s: SCALE UNITEX UNIX 1.1.77', client.input.remoteAddress);
    console.log('%s: Unauthorised access to this service is prohibited.', client.input.remoteAddress)
    console.log('%s: login:', client.input.remoteAddress)
    client.write('SCALE UNITEX UNIX 1.1.77\n');
    client.write('Unauthorised access to this service is prohibited.\n');
    client.write('login: ');
}).listen(23);
