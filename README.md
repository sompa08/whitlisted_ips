# whitelist_ip_poc

## Project setup
```
npm install
```

### To run the code 
```
npm start
```
###### Api curl #####

### for adding/whitelisting ip 
curl --location 'http://localhost:3000/api/whitelist' \
--header 'Content-Type: application/json' \
--data '{
    "ip":"ip 27.7.121.56"
}'

### for getting whitelisted ips
curl --location --request GET 'http://localhost:3000/api/whitelist' \
--header 'Content-Type: application/json' \
--data '{
    "ip":"ip 27.7.121.56"
}'

### for Allowing only whitelisted IP to make a successful call
curl --location 'https://ac9d-106-51-82-223.ngrok-free.app/api/protected'


### for Applying rate limits to the number of requests. 
As of now api rate limit has been kept as 3 times in one minute and this is configurable.
