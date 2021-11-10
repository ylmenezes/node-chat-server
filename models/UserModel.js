const db = require('../db/conn');

class UsersModel {

    async findById(id){
        return await db.from('users').where('cod_user', id).first();
    }

    async userExists(id) {

       let exists = await db.from('users').where('cod_user', id);
       return exists.length > 0 ? true : false;
    }

}

module.exports = new UsersModel();