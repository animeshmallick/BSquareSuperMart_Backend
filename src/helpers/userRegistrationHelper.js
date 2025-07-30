const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
class UserRegistrationHelper{
    async generate_userid(){
        let userid = '';
        await database.query(Sql.get_last_userid())
        .then(result => {
            if(result.length === 1 && result[0].max_id !== null){
                userid =  "USR" + String(result[0].max_id + 1).padStart(3, '0');
            }else{
                return {error: "Something went wrong"};
            }
        }).catch(err => {
            return {error: err.message}
        })
        return userid;
    }
}
module.exports = new UserRegistrationHelper();