require('dotenv').config();
const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')
var logger = require('morgan');
require('./config/db');
const { isrealString } = require('./utils/isrealString');
const { User } = require('./utils/users');

app.use(cors());
app.use(logger('dev'))
app.use(express.json());

const server = http.createServer(app);

let io = socketio(server, {
    cors: {
        origin: '*'
    }
});

/**
 * User State management
 */

let user = new User();

/**
 * Socket io code
 */

io.on('connection', (socket) => {
    // console.log(client);
    console.log('connect..');

    socket.on('join', (params, callback) => {
        let symbol = 'X';
        let player = 1;

        if (!isrealString(params.playername) || !isrealString(params.roomname)) {
            return callback("Name And Room are required");
        }

        if (user.getUserList(params.roomname).length > 2) {
            return callback("Room Full")
        }

        user.removeUser(socket.id);
        
        socket.join(params.roomname);

        if (user.getUserList(params.roomname).length == 1) {
            symbol = 'O';
            player = 2;
        }
        

        user.adduser(socket.id, params.playername, params.roomname, symbol, player, params.userid);
      

        if (user.getUserList(params.roomname).length == 2) {
            console.log('game started');
            let userlist = user.getAlldetailsByRoom(params.roomname);
            io.to(params.roomname).emit('gameStarted', userlist);
            user.addBoard(params.roomname);
        }
        callback();
    })

    socket.on('isgamevalid',(data,callback)=>{
        const roomid = data.roomname;
        // console.log(roomid);
        const userlist =  user.getAlldetailsByRoom(roomid);
        console.log(userlist);
        if(userlist && userlist.length === 2){
            callback(userlist)
        }
        callback(false);
    })
    
    

    socket.on('updateboard', (data,callback) => {
        console.log('d', data);
        let newboard = user.updateBoard(data.roomname, data.index, data.symbol);
        // console.log(newboard);
        io.to(data.roomname).emit('getNewupdatedboard', { newboard });
        callback();
    })

    socket.on('getGameBoard',(data,callback)=>{
        const roomid = data.roomname;
        const board =  user.getGameBoardByRoom(roomid);
        // console.log(board);
        callback(board);
    })
    
    socket.on('disconnect', () => {
        console.log("disconn....")
    })
})

/**
 * initilize routes
*/

require('./routes/index')(app);

/**
* establish connection
*/

server.listen('8000', () => {
    console.log('server listning at 8000');
});