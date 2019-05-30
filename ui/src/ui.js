let IP = env.backendHost;
let PORT = env.backendPort;

$(document).ready(function(){

    getNumbers();
});

function getNumbers(){
    console.log(`Connecting to ${IP}:${PORT}`)
    $.get(`http://${IP}:${PORT}/lotteryNumbers`, ( data ) => {
        displayNumbers(data.numbers);
      }).fail(function(data) {
        $('#loading').show();
        $('#resetBtn').hide();
        $('#numbers').empty();
        if (data.status === 503){
            let retryAfter = parseInt(data.getResponseHeader("Retry-After"));
            console.log(`Server not ready for ${retryAfter}. Will retry after that..`)
            setTimeout(getNumbers, retryAfter*1000);
        }
      });
}

function displayNumbers(nums){
    numsdiv = $('#numbers').empty();

    $('#loading').hide();
    $('#resetBtn').show();
    for (let i = 0; i < nums.length; i++){
        console.log(i)
        numsdiv.append(`<div class='lotteryNum'>${nums[i]}</div>`);
    }
    
}

function reset(){
    console.log("Resetting the numbers..")
    $.post(`http://${IP}:${PORT}/reset`, ( ) => {
        getNumbers();
      });
}