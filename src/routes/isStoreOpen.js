const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const StoreOpen = require('../helpers/storeOpenHelper.js');

const router = express.Router();

/**
 * @swagger
 * /isStoreOpen:
 *   get:
 *     summary: Check if the store is currently open
 *     description: Returns `true` if the current server time is between store opening and closing times, otherwise `false`.
 *     tags:
 *       - Store
 *     responses:
 *       200:
 *         description: Store open status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isOpen:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server error while checking store hours
 *
 */

router.get('/',(req,res)=> {
    const time = new Date();
    const currentTimeMinutes = time.getHours()*60 + time.getMinutes() + time.getSeconds()/60;
    database.query(Sql.get_store_timings())
        .then(result => {
            if (result.length === 1 && result[0].opening_time && result[0].closing_time){
                const openTimeMinutes = StoreOpen.toMinutes(result[0].opening_time);
                const closeTimeMinutes = StoreOpen.toMinutes(result[0].closing_time);
                let isOpen = false;
                if (openTimeMinutes <= closeTimeMinutes) {// Same day
                    isOpen = currentTimeMinutes >= openTimeMinutes && currentTimeMinutes <= closeTimeMinutes;
                } else {// Crosses midnight
                    isOpen = currentTimeMinutes >= openTimeMinutes || currentTimeMinutes <= closeTimeMinutes;
                }
                res.status(200).json({isOpen: isOpen});
            }
        })
        .catch(err =>{
            res.status(500).json({error: err});
        })
})
module.exports = router;