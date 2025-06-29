class GetPurchaseIdHelper {
    getPurchaseID(){
        const now = new Date();

        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // January is 0
        const yy = String(now.getFullYear()).slice(-2);
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');

        const datetimePart = `${dd}${mm}${yy}${hh}${min}${ss}`;

        const randomSuffix = Math.random().toString(36).substring(2, 10).toUpperCase(); // 4-letter random string

        const pid = `PID-${datetimePart}-${randomSuffix}`;
        console.log(`New PurchaseID Generated: ${pid}`);
        return pid;
    }
}
module.exports = new GetPurchaseIdHelper();