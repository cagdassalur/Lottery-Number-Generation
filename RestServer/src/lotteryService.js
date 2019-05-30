import TcpClient from './tcpClient';

export default class LotteryService {
    constructor(host, port, totalNumbers = 6){
        this.totalNumbers = totalNumbers;
        this.tcpClient =  new TcpClient(host, port, totalNumbers);
        this.numbers = null;
    }

    isReady(){
        return (this.tcpClient.history.length >= this.totalNumbers)
    }

    getWinningNumbers(){
        if (this.numbers === null){
            this.numbers = [...this.tcpClient.history];
            this.tcpClient.resetHistory();
        }
        return this.numbers;
    }

    getRemainingTime(){
        return (this.totalNumbers - this.tcpClient.history.length);
    }

    resetLottery(){
        this.numbers = null;
    }

}