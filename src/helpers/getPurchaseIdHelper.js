const util = require('../utils/utils.js');
class GetPurchaseIdHelper {
    #getRamdomString(){
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    getPurchaseID(){
        return `PID-${util.getDateTimeString()}-${this.#getRamdomString()}`;
    }
    getOrderID(pid){
        return `OID-${util.getDateTimeString()}-${pid.split('-')[2]}-${this.#getRamdomString()}`;
    }
}
module.exports = new GetPurchaseIdHelper();