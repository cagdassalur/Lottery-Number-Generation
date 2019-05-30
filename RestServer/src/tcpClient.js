
const net = require('net');


export default class TcpClient {
    constructor(host, port, messageHistorySize=10){
        this._maxHistorySize = messageHistorySize;

        this.client = new net.Socket();
        this.host = host;
        this.port = port;
        this.history = []

        this._connect();
        this.client.on('data', (data) => {this._onReceive(data);});
    }

    resetHistory(){
        this.history = [];
    }

    _connect(){
        this.client.connect(this.port, this.host);
    }

    _onReceive(data){
        // console.log('Got Message: ' + data);
        this.history.push(data.toString().trim())
        if (this.history.length > this._maxHistorySize)
            this.history.shift();
    }

    // TODO could add some sort of timeout in the case of tcp server being
    // permenantly closed.
    _onClose(){
    
        this._connect();
    }
}