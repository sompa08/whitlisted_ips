const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whitelist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
// schma for vouchers
const inventorySchema = new mongoose.Schema({
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
    productId:{
        type: String
    },
    denomination:{
        type: String
    },
    vendorSkuId:{
        type: String 
    },
    vendorId: {
        type: String
    },
    orderId: {
        type: String
    },
    vendorOrderId:{
        type: String
    },
    status:{
      type: String // available, delivered, cancelled
    },
    cancellationReason:{
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

const Inventories = mongoose.model('Inventories', inventorySchema);

module.exports = Inventories;