const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// serviceTitle, staffLastName, start, end
exports.createEvent = function() {

    console.log('Beginning event creation');
    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];
    const TOKEN_PATH = 'token.json';

    // Load client secrets from a local file.
    fs.readFile('./public/javascripts/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), insertEvent);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        console.log('client_secret: ' + client_secret);
        console.log('client_id: ' + client_id);
        console.log('redirect_uris: ' + redirect_uris[0]);
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'online',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }

    /* -- Sample event */
    let event = {
        'summary': 'TEST SMAS Appointment',
        'location': '15 Broadway, Ultimo NSW 2007: - Room XXX',
        'description': 'The description I gave for... ',
        'start': {
            //'dateTime': '2015-05-28T09:00:00-07:00',
            'dateTime': '2018-10-26T13:00:00',
            'timeZone': 'Australia/Sydney',
        },
        'end': {
            //'dateTime': '2015-05-28T17:00:00-07:00',
            'dateTime': '2018-10-26T15:30:00',
            'timeZone': 'Australia/Sydney',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'},
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 2 * 60},
            ],
        },
    };

    function constructEvent(serviceTitle, staffLastName, start, end) {
        return {
            'summary': ('UTS Medical Appointment - ' + serviceTitle),
            'location': ('15 Broadway, Ultimo NSW 2007'),
            'description': ('UTS Medical Appointment with Dr. ' + staffLastName + ' for service: ' + serviceTitle),
            'start': {
                //'dateTime': '2015-05-28T09:00:00-07:00',
                'dateTime': start,
                'timeZone': 'Australia/Sydney',
            },
            'end': {
                //'dateTime': '2015-05-28T17:00:00-07:00',
                'dateTime': end,
                'timeZone': 'Australia/Sydney',
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 2 * 60},
                ],
            },
        };
    }

    //https://developers.google.com/calendar/create-events

    function insertEvent(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event, //constructEvent(serviceTitle, staffLastName, start, end),
            sendNotifications: true,
        }, function (err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event.htmlLink);
        });
    }
};




/*
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.

function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
}
*/