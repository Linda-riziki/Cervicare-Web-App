const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    age: String,
    partners: String,
    hpv: String,
    pap: String,
    riskScore: Number,
    riskLevel: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', assessmentSchema);