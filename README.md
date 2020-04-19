# Email Stats

## Description

Email Stats will generate SendGrid email statistics by aggregating data sent to the application using the Event Webhook [feature](https://sendgrid.com/docs/for-developers/tracking-events/event).

## Getting Started

Download and setup [ngrok](https://ngrok.com/download).

```bash
./ngrok http 127.0.0.1:8888
```

Set your webhook URL equal to the URL that ngrok gives you. Note: You will need a SendGrid API key for this.

```bash
curl --request PATCH \
  --url https://api.sendgrid.com/v3/user/webhooks/event/settings \
  --header 'authorization: Bearer <SENDGRID_API_KEY>' \
  --header 'content-type: application/json' \
  --data '{"enabled":true,"url":"<NGROK_URL>","group_resubscribe":true,"delivered":true,"group_unsubscribe":true,"spam_report":true,"bounce":true,"deferred":true,"unsubscribe":true,"processed":true,"open":true,"click":true,"dropped":true}'
```

Start the application. Note: The application runs on port 8888.

```bash
node app.js
```

Send fake event data using this handy SendGrid endpoint.

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/user/webhooks/event/test \
  --header 'authorization: Bearer <SENDGRID_API_KEY>' \
  --data '{"url":"<NGROK_URL>"}'
```

## Endpoints

### Totals

GET `/all`

Retrieve all of the counters.

Request:

```bash
curl http://localhost:8888/all
```

Response:

```json
{"total_stats":{"processed":1,"dropped":1,"delivered":1,"bounce":1,"deferred":1,"open":1,"click":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1,"spamreport":1},"category_stats":{"cat facts":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}},"daily_stats":{"2/23/2020":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}},"weekday_stats":{"Sunday":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}},"hourly_stats":{"12PM":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}},"monthly_stats":{"February":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}},"total_events":11}
```

GET `/total_stats`

Retrieve the total counts for processed, dropped, delivered, bounce, deferred, open, click, unsubscribe, group_unsubscribe, group_resubscribe, and spamreport events.

Request:

```bash
curl http://localhost:8888/total_stats
```

Response:

```json
{"processed":1,"dropped":1,"delivered":1,"bounce":1,"deferred":1,"open":1,"click":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1,"spamreport":1}
```

GET `/total_events`

Retrieve the total number of events that reached the webhook.

Request:

```bash
curl http://localhost:8888/total_events
```

Response:

```json
{"total":11}
```

GET `/total_requests`

Retreive the total number of requests (number of processed and dropped events).

Request:

```bash
curl http://localhost:8888/total_requests
```

Response:

```json
{"requests":2}
```

### Categories

GET `/category_stats`

Retrieve stats for each category.

Request:

```bash
curl http://localhost:8888/category_stats
```

Response:

```json
{"cat facts":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

GET `/category_stats/:cat`

Retrieve stats for a specific category.

Request:

```bash
curl http://localhost:8888/category_stats/cat%20facts
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

### Daily Stats

GET `/daily_stats`

Retreive stats for each day.

Request:

```bash
curl http://localhost:8888/daily_stats
```

Response:

```json
{"2/22/2020":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

GET `/daily_stats/:day`

Retrieve stats for a specific day.

Request:

```bash
curl http://localhost:8888/daily_stats/2%2F22%2F2020
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

GET `/weekday_stats`

Retreive stats for each day of the week.

Request:

```bash
curl http://localhost:8888/weekday_stats
```

Response:

```json
{"Saturday":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

GET `/weekday_stats/:day`

Retrieve stats for a specific day of the week.

Request:

```bash
curl http://localhost:8888/weekday_stats/saturday
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

### Hourly Stats

GET `/hourly_stats`

Retrieve stats for each hour of the day.

Request:

```bash
curl http://localhost:8888/hourly_stats
```

Response:

```json
{"2PM":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1},"3PM":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

GET `/hourly_stats/:hour`

Retrieve stats for a specfic hour of the day.

Request:

```bash
curl http://localhost:8888/hourly_stats/3PM
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

### Monthly Stats

GET `/monthly_stats`

Retrieve stats for each month of the year.

Request:

```bash
curl http://localhost:8888/monthly_stats
```

Response:

```json
{"February":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

GET `/monthly_stats/:month`

Retrieve stats for a specfic month of the year.

Request:

```bash
curl http://localhost:8888/monthly_stats/february
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

### Reset

`/clear`

Clear will clear all of the counters.

Request:

```bash
curl http://localhost:8888/clear
```

Response:

```json
{"success":"counters have been cleared"}
```

### Notifications

You can create alerts to get notified via a text message when you reach a certain number of events. Note: You will need to export your `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`.

#### Create Notification

POST `/notification`

Request:

```bash
curl --request POST --header "Content-Type: application/json" --data '{"name":"got 5 opens","event":"open","threshold":5,"phone":"+10001112222","counter":"total_stats"}' http://localhost:8888/notification
```

Response:

```json
{"success":"created the notification"}
```

#### Get Notifications

GET `/notification`

Request:

```bash
curl http://localhost:8888/notification
```

Response:

```json
{"got 5 opens":{"enabled":true,"phone":"+10001112222","event":"open","threshold":5,"counter":"total_stats"}}
```

#### Enable Notification

PATCH `/notification`

Request:

```bash
curl --request PATCH --header "Content-Type: application/json" --data '{"name":"got 5 opens"}' http://localhost:8888/notification
```

Response:

```json
{"success":"enabled the notification"}
```

#### Delete Notification

DELETE `/notification`

Request:

```bash
curl --request DELETE --header "Content-Type: application/json" --data '{"name":"got 5 opens"}' http://localhost:8888/notification
```

Response:

```json
{"success":"deleted the notification"}
```
