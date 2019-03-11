const axios = require('axios')
const googleCalendarApi = `https://www.googleapis.com/calendar/v3/calendars/primary/events`

function postToGoogleCalendar(req, res, next) {

    if (req.headers.authorization !== null) {
        axios
            .post(`${googleCalendarApi}`,
                {
                    "end": {
                        "date": `${req.body.dueDate}`
                    },
                    "start": {
                        "date": `${req.body.dueDate}`
                    },
                    "description": `${req.body.name}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${req.headers.authorization}`
                    }
                })
            .then(({ response }) => {
                next()
            })
            .catch(({ response }) => {
                next()
            })
    } else {
       next()
    }
}

module.exports = postToGoogleCalendar