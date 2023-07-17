const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whitelist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    refno: {
        type: String
    },
    status: {
        type: String
    },
    statusLabel: {
        type: String
    },
    date: {
        type: String
    },
    scheduledDate: {
        type: String
    },
    extCustomerId: {
        type: String
    },
    grandTotal: {
        type: String
    },
    subTotal: {
        type: String
    },
    discount: {
        type: Number
    },
    packaging: {
        type: Object
    },
    corporateDiscount: {
        label: String,
        amount: Number,
        percentage: Number
    },
    totalQty: {
        type: Number
    },
    handlingCharges: {
        label: String,
        amount: Number,
    },
    orderTypeCode: {
        type: String
    },
    payout: {
        convenienceCharge: Number,
        accountNumber: String,
        vpa: String,
        bankUtr: Number
    },
    products: [
        {
            name: String,
            type: String,
            qty: Number,
            price: String,
            total: String,
            discount: String,
            corporateDiscount: {
                label: String,
                amount: Number,
                percentage: Number
            },
            image: {
                thumbnail: String,
                mobile: String,
                base: String,
                small: String
            },
            currency: {
                code: String,
                numericCode: String,
                symbol: String
            },
            mergedQty: Number
        }
    ],
    currency: {
        code: String,
        numericCode: String,
        symbol: String
    },
    address: {
        salutation: String,
        name: String,
        line1: String,
        line2: String,
        line3: String,
        line4: String,
        city: String,
        region: String,
        postcode: String,
        country: String,
        telephone: String,
        email: String,
        gstn: String,
        company: String
    },
    billing: {
        salutation: String,
        name: String,
        line1: String,
        line2: String,
        line3: String,
        line4: String,
        city: String,
        region: String,
        postcode: String,
        country: String,
        telephone: String,
        email: String,
        gstn: String,
        company: String
    },
    etaMessage: String,
    shipments: [
        {
            tracks:Array
        }
    ],
    shipping: {
        method: {
            code: String,
            label: String,
            amount: Number,
            eta: String
        }
    },
    payments: [
        {
            code: String,
            name: String,
            amount: String,
            poNumber: String
        }
    ],
    orderType: String,
    fullFilledBySeller: Boolean,
    consolidatedEmailStatus: String,
    cardTypes: Array,
    isMreOrder: Boolean,
    cancel: {
        allowed: Boolean,
        allowedWithIn: Number
    },
    bizApprove: {
        status: Number,
        actionDate: String,
        by: String,
        comment: String
    },
    additionalTxnFields: {
        remarks: String
    },
    delivery: {
        summary: {
            email: {
                totalCount: Number,
                delivered: Number,
                failed: Number,
                inProgress: Number
            },
            sms: {
                totalCount: Number,
                delivered: Number,
                failed: Number,
                inProgress: Number
            },
            totalCardsCount: Number
        }
    },
    cards: {
        summary: {
            success: Number,
            inProgress: Number,
            failed: Number,
            totalCardsCount: Number
        }
    },
    orderHistory: [
        {
            eventGroup: String,
            eventStatus: String,
            label: String
        },
        {
            eventGroup: String,
            eventStatus: String,
            label: String
        },
        {
            eventGroup: String,
            eventStatus: String,
            label: String
        },
        {
            eventGroup: String,
            eventStatus: String,
            label: String
        },
        {
            eventGroup: String,
            eventStatus: String,
            label: String
        }
    ],
    extensionParams:Array,
    orderReceipt: String,
    createdBy: {
        type: String,
        // ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Orders = mongoose.model('orders', orderSchema);

module.exports = Orders;