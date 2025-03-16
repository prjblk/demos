# CORS Demo Exploitation

A simple app that can be used to demonstrate exploiting CORS.

## Pre-requisites
Install these:
* Docker and docker-compose
* ngrok or similar (so our app can be accessed using a different FQDN and is served over HTTPs - requirement for `Samesite=None`)

## Setup
1. Run `ngrok http 80`.
2. Update line 15 in `malicious-frontend\index.html` with the allocated ngrok fqdn.
    * `const response = await fetch('https://{CHANGEME}/api/protected', {`
3. In the root directory, run `docker-compose up`.
4. You can now browse to {ngrokurl} to access our fake web app, login with `admin` and `password123` and fetch our protected data.
5. Browse to `localhost:8080` to view our malicious site.
6. Click the exploit CORS button to fetch protected data by submitting a CORS request.
7. BONUS: Play around with some of the Cookie/CORS config to see the request failing as you apply security config.
    * Play with lines 10, 12, and 28 in `backend\server.js`