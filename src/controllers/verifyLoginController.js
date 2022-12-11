const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_OTP);
const OTP = require('../models/OTP');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

exports.verifyLogin = async (req, res) => {
    try{
        const existUser = await user.findOne({email: req.body.email});
        if(existUser){
            const existOTP = await OTP.findOne({email: req.body.email, type: 'login', status: false});
            console.log(existOTP);
            if(existOTP){
                const decryptedString = cryptr.decrypt(existOTP.otp);
                console.log(decryptedString);
                if(decryptedString == req.body.OTP){
                    const token = jwt.sign({email: existUser.email}, process.env.SECRET_JWT);
                    existOTP.status = true;
                    await existOTP.save();
                    res.json({
                        'response': {
                            'responseCode': '00',
                            'responseMessage': 'Login success',
                        },
                        token: token
                    });
                }else{
                    res.json({
                        'response': {
                            'responseCode': '16',
                            'responseMessage': 'Wrong OTP',
                        }
                    });
                }
            }else{
                res.json({
                    'response': {
                        'responseCode': '15',
                        'responseMessage': 'OTP not found',
                    }
                });
            }
        }else{
            res.json({
                'response': {
                    'responseCode': '14',
                    'responseMessage': 'User not found',
                }
            });
        }
    }catch(err){
        console.log(err);
        res.json({ responseCode: '99', responseMessage: 'Server error' });
    }
};