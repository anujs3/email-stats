# Email Stats

## Description

Email Stats will generate SendGrid email statistics by aggregating data sent to the application using the Event Webhook [feature](https://sendgrid.com/docs/for-developers/tracking-events/event).

## Getting Started

Download and setup [ngrok](https://ngrok.com/download).

```bash
./ngrok http 127.0.0.1:8888
```

Set your webhook URL equal to the URL that ngrok gives you.

```bash
curl --request PATCH \
  --url https://api.sendgrid.com/v3/user/webhooks/event/settings \
  --header 'authorization: Bearer <SENDGRID_API_KEY_HERE>' \
  --header 'content-type: application/json' \
  --data '{"enabled":true,"url":"<NGROK_URL>","group_resubscribe":true,"delivered":true,"group_unsubscribe":true,"spam_report":true,"bounce":true,"deferred":true,"unsubscribe":true,"processed":true,"open":true,"click":true,"dropped":true}'
```

Start the application. Note: The application runs on port 8888.

```bash
node app.js
```

## Endpoints

### Totals

`/total_stats`

Retrieve the total counts for processed, dropped, delivered, bounce, deferred, open, click, unsubscribe, group_unsubscribe, group_resubscribe, and spam_report events.

Request:

```bash
curl http://localhost:8888/total_stats
```

Response:

```json
{"open":1,"click":1,"dropped":1,"group_unsubscribe":1,"group_resubscribe":1,"unsubscribe":1,"processed":1,"delivered":1,"bounce":1,"deferred":1,"spamreport":1}
```

`/total_events`

Retrieve the total number of events that reached the webhook.

Request:

```bash
curl http://localhost:8888/total_events
```

Response:

```json
{"total":11}
```

`/total_requests`

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

`/category_stats`

Retrieve stats for each category.

Request:

```bash
curl http://localhost:8888/category_stats
```

Response:

```json
{"cat facts":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

`/category_stats/:cat`

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

`/daily_stats`

Retreive stats for each day.

Request:

```bash
curl http://localhost:8888/daily_stats
```

Response:

```json
{"2/22/2020":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

`/daily_stats/:day`

Retrieve stats for a specific day.

Request:

```bash
curl http://localhost:8888/daily_stats/2%2F22%2F2020
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

`/weekday_stats`

Retreive stats for each day of the week.

Request:

```bash
curl http://localhost:8888/weekday_stats
```

Response:

```json
{"Saturday":{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}}
```

`/weekday_stats/:day`

Retrieve stats for a specific day of the week.

Request:

```bash
curl http://localhost:8888/weekday_stats/saturday
```

Response:

```json
{"processed":1,"deferred":1,"delivered":1,"open":1,"click":1,"bounce":1,"dropped":1,"spamreport":1,"unsubscribe":1,"group_unsubscribe":1,"group_resubscribe":1}
```

### Reset

`/clear`

Request:

Clear will clear all of the counters.

```bash
curl http://localhost:8888/clear
```

Response:

```json
counters have been cleared
```
