const net = require('net');

const {HOST, PORT} = {HOST: '0.0.0.0', PORT: 8085} 

const server = net.createServer(onConnect);

server.on('close', (r) => {
	console.log('close!')
	r.unpipe(f)
  });
  server.on('error', (r) => {
	console.log('error!')
	r.unpipe(f)
  });

server.listen(PORT, HOST, () => 
	{ console.log(`Started TCP server on ${HOST}:${PORT}`); }
);

function onConnect(socket){
	setInterval(() => {
		socket.write(generateLotteryNums() + "\r\n");
	}, 1000);
}

function generateLotteryNums(){
	let generatedNumber = Math.floor(Math.random() * 100 + 1)
	return generatedNumber.toString();
}