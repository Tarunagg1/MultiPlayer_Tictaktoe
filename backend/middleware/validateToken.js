const jwt = require('jsonwebtoken');

const validateOtpToken = async (req, res, next) => {
    const vtoken = req.headers.authorization;
    try {
        if (vtoken) {
            const decodeData = jwt.verify(vtoken, process.env.OTP_SECRET)
            // console.log(decodeData);
            if (decodeData && decodeData.istopvalidate == true) {
                req.otpnumber = decodeData.number;
                next();
            } else {
                return res.status(500).json({ message: "invalid token", status: false });
            }
        } else {
            return res.status(500).json({ message: "Token Must be provided or invalid", status: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Token Must be provided or invalid", status: false });
    }

}


const validateLoginToken = async (req, res, next) => {
    const vtoken = req.headers.authorization;
    try {
        if (vtoken) {
            const decodeData = jwt.verify(vtoken, process.env.LOGIN_SECRET)
            if (decodeData) {
                req.user = decodeData;
                next();
            } else {
                return res.status(500).json({ message: "invalid token", status: false });
            }
        } else {
            return res.status(500).json({ message: "Token Must be provided", status: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Token Must be provided", status: false });
    }
}

module.exports = { validateOtpToken, validateLoginToken };