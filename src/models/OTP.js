const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const OTPSchema = new Schema({
    otp: String,
    status: Boolean,
    date: Date,
    expireAt: {
        type: Date,
        default: Date.now() + 5 * 60 * 1000,
        index: { expires: '300s' },
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('OTP', OTPSchema);