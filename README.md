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
