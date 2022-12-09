const mongoose = require('mongoose');
const user = require('../models/user');
const transaction = require('../models/transaction');

exports.login = async (req, res) => {
    const newTransaction = new transaction({
        accNo: '123456789',
        amount: 100000,
        toAccNo: '987654321',
        status: true,
        description: 'test',
        date: Date.now(),
        user: '6391e5bff8cf4c462e0469ee',
    });
    await newTransaction.save();
    // get all transaction of a user
    const userfind = await transaction.find({user: '6391e5bff8cf4c462e0469ee'});
    console.log(userfind);
    res.json({newTransaction});
};