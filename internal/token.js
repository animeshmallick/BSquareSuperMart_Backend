const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY;

class Token {
    getToken(customer_id) {
        return jwt.sign({ customer_id: customer_id }, SECRET, { expiresIn: '1h' });
    }

    verifyAuthToken(req, res, next) {
        console.log("Checking API Authorization : ...");
        const authHeader = req.headers['x-authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: "Authorization Token Missing" });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, authToken) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Authorization Token" });
            }
            console.log("Authorized User : " + authToken.customer_id);
            req.customer_id = authToken.customer_id;
            next();
        });
    }
}

module.exports = new Token();
