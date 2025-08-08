class StoreOpenHelper{
    toMinutes(time){
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return (hours*60 + minutes + seconds/60);
    }
}
module.exports = new StoreOpenHelper();