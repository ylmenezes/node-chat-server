const db = require('../db/conn');
const moment = require('moment');

class ChatMessageModel {

    async setMessage(data){

        try{

            if( typeof data !== 'object')
                throw "Parameter invalid, expected Object as value.";

            let { cod_chat, message, cod_user} = data;

            let now = moment().format('YYYY-MM-DD HH:mm:ss');

            let inserted = await db.insert({
                cod_chat,
                message,
                dt_register: now,
                cod_user_register: cod_user
            })
            .into('chat_message');

            return inserted.length > 0 ? true : false;

        }catch(err){
            return { err: true , msg: err };
        }

    }

}

module.exports = new ChatMessageModel();