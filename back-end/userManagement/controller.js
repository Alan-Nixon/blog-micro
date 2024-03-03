const jwt = require('jsonwebtoken')
const { User } = require('./dbConnection');


const isLoggedIn = async (req, res) => {
    const token = req.query.token
    if (!token) { return res.status(403).json({ message: 'Token is required' }); }

    jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
        if (err) { return res.status(401).json({ message: 'Invalid token' }); }
        const data = await User.findById(decoded.userId)
        res.json({ isLoggedIn: decoded.userId, data, status: true });
    });
}

const postLogin = async (req, res) => {
    try {
        console.log(req.body, "In the postLogin route");
        const user = await User.findOne({ Email: req.body.Email });
        if (user) {
            if (user.Password === req.body.Password) {
                const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, { expiresIn: '1h' })

                res.json({ status: true, token });
            } else {
                res.json({ status: "password does not match" });
            }
        } else {
            res.json({ status: "user not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: false });
    }
}


const signup = async (req, res) => {
    try {
        if (await User.findOne({ Email: req.body.Email })) {
            res.json({ status: false, message: "user already exists" });
        } else {
            const userData = await User.insertMany(req.body);
            const token = jwt.sign({ userId: userData[0]._id }, process.env.JWTSECRET, { expiresIn: '1h' });
            res.json({ userData, token });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: false });
    }
}

module.exports = { isLoggedIn, postLogin, signup }