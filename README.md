# Lottery-Number-Generation


## Usage

Pull the project

```
$ git clone https://github.com/cagdassalur/Lottery-Number-Generation.git
```

Edit these lines in __docker-compose.yaml__ to set environment variables to your host ip and restserver port

```
...
      - BACKENDHOST=YOURIP
      - BACKENDPORT=8090
...
```

Then just run docker-compose

```
$ docker-compose up -d
```

You can connect to the interface on http://yourip:8000.


## RestApi

There are 3 endpoints for the server.

### GET /lotteryNumbers

Returns 6 randomly generated numbers initially.

```
{
      numbers: [53, 23, 2, 46, 6, 33]
}
```

Will return __503 Service Unavailable__ if the numbers are not done generating yet.
__Retry-After__ headers show how many seconds are left until the service is ready.


### POST /reset

Discards previously generated numbers and starts the number generation process.


### GET /status

Returns the status of the restserver.
```
{
      isServerUp: true,
      isReady: false,
      remainingTimeUntilReady: 6
}
```




