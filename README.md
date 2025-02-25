# RingCentral Web Phone private parking demo

This is a demo to demonstrate how to private park a call and how to pick up the
parked call.

Detailed documentation is here:
https://github.com/ringcentral/ringcentral-web-phone?tab=readme-ov-file#private-parking

## Setup

Rename `./src/.env.sample` to `./src/.env` and specify credentials.

```
deno install
```

We use deno as JS dev env. The code should work in Node.js too.

## Run

```
deno task serve
```

## Test

Open http://localhost:3000

There is no GUI, you will only see "Hello world!" on the page. You will need to
watch the browser console output to know what is happening.

Make a call to the web phone, the call will be auto answered, private parked and
picked up from parking.
