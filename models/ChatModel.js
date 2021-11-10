const db = require('../db/conn');

class ChatModel {

    async chatExists(id) {
        
        let checked = await db.where('cod_chat', id).from('chat');
        return checked.length > 0 ? true : false;

    }

}

module.exports = new ChatModel();