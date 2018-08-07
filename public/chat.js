//THIS HANDLS THE FRONT-END

//Make connection to the server to create websocket between client and server
const frontSocket = io.connect('http://localhost:5000');

//Query DOM
let output = document.getElementById("output");
let handle = document.getElementById("handle");
let msg = document.getElementById("message");
let btn= document.getElementById("send");
let feedback = document.getElementById("feedback");


//Emit Event when someone send msg
btn.addEventListener('click',()=>{
    //emit a msg down the WebSocket to the server - after clicking "Send"
    //emit() takes 2 params, 1st: name of the msg, 2nd: msg data to send to the server   
    frontSocket.emit('chat', {
        message: msg.value,
        handle: handle.value
    });
    //clear the message after clicking "Send"
    clearMessage(msg);
});

clearMessage = (text) =>{
    text.value="";
}
    
msg.addEventListener('keypress', ()=>{
    frontSocket.emit('typing', handle.value);
});

//Listen for events from server back to all other client-browsers
frontSocket.on('chat', (data)=>{
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>'+ data.message + '</p>'; 
});

frontSocket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});