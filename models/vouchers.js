const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whitelist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
// schma for vouchers
const voucherSchema = new mongoose.Schema({
    cardNumber: {
        type: String
    },
    pinCode: {
        type: String,
    },
    claimUrl: {
        type: String
    },
    expiryDate: {
        type: Date
    },
    vendorId: {
        type: String
    },
    orderId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Vouchers = mongoose.model('vouchers', voucherSchema);

module.exports = Vouchers;