import LotteryService from './lotteryService';


const {http, url} = {http: require('http'), url: require('url')}

const {HOST, PORT} = {HOST: '0.0.0.0', PORT: 8090}
const {TCPHOST, TCPPORT} = {TCPHOST: 'tcpserver', TCPPORT: 8085}

const errorCodes = {404: 'Invalid Request', 405: 'Method Not Allowed', 
                        503: "Service Unavailable"};


let lotteryService =  new LotteryService(TCPHOST, TCPPORT);

let server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Retry-After');


    console.log(`Got ${req.method} request: ${reqUrl.path}`);

    // API Endpoints
    switch(reqUrl.pathname){
        case '/lotteryNumbers':

            if (req.method === 'GET'){
                if (lotteryService.isReady()){
                    let responseBody = { numbers: lotteryService.getWinningNumbers() };
                    successResponse(res, responseBody);
                }
                else
                    errorResponse(res, 503, lotteryService.getRemainingTime())
            }
            else 
                errorResponse(res, 405);

            break;

        case '/reset':

            if (req.method === 'POST'){
                lotteryService.resetLottery()
                successResponse(res);
            }
            else errorResponse(res, 405);

            break;
        
        case '/status':

            if (req.method === 'GET'){
                let responseBody = { 
                    isServerUp: true,
                    isReady: lotteryService.isReady(),
                };
                if (!responseBody.isReady)
                    responseBody.remainingTimeUntilReady = lotteryService.getRemainingTime();
                successResponse(res, responseBody);
            }
            else errorResponse(res, 405);

            break;

        default:
            errorResponse(res, 404);

    }

});

function successResponse(res, body=null){
    res.statusCode = 200;
    if (body !== null){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
    }
    else
        res.end();
}

function errorResponse(res, code, retryAfter=null){
    res.statusCode = code;
    res.setHeader('Content-Type', 'text/plain');
    if (retryAfter !== null) 
        res.setHeader('Retry-After', retryAfter);
    
    console.log(`Returning error ${code} ${errorCodes[code]}`)

    res.end(errorCodes[code]);
}

server.listen(PORT, HOST, () => 
	{ console.log(`Started listening on http://${HOST}:${PORT}/`); }
);