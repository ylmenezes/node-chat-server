const dovtenv = require('dotenv');
dovtenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

const UsersModel = require('./models/UserModel');
const ChatMessageModel = require('./models/ChatMessageModel');
const ChatModel = require('./models/ChatModel');

const port = process.env.APP_PORT;
app.use( cors() );

io.on('connection', socket => {

    socket.on('disconnect', d => {
        console.log(socket.id);
    });

    socket.on('writing', data => {
        io.emit('writingResponse', data);
        console.log(data)
    });

    socket.on('sendMessage', async (data)=>{
        try {
            let { message, chat_id, user_id } = data;

            let userExists = await UsersModel.userExists(user_id);
            let chatExists = await ChatModel.chatExists(chat_id);

            if( userExists && chatExists ){
                let saved = await ChatMessageModel.setMessage({
                    cod_chat: chat_id, 
                    message: message, 
                    cod_user: user_id
                });

                if( saved ){
                    io.emit('chat-message', { 
                        message, 
                        user_id,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }

    });

});

http.listen(port, () => {
    console.log(`Chat Service start ${port}`);
});
