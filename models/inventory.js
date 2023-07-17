const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whitelist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
// schma for vouchers
const inventorySchema = new mongoose.Schema({
    id: String,
    sku: String,
    name: String,
    description: String,
    price: {
        price: String,
        type: String,
        min: String,
        max: String,
        denominations: Array,
        currency: {
            code: String,
            symbol: String,
            numericCode: String
        },
        cpg: Array
    },
    kycEnabled: String,
    additionalForm: String,
    metaInformation: {
        page: {
            title: String
        },
        meta: {
            title: String,
            keywords: String,
            description: String
        },
        canonical: {
            url: String
        }
    },
    type: String,
    schedulingEnabled: Boolean,
    currency: String,
    images: {
        thumbnail: String,
        mobile: String,
        base: String,
        small: String
    },
    tnc: {
        link: String,
        content: String
    },
    categories: Array,
    themes: [{
        sku: String,
        price: String,
        image: String,
        pdfImage: String,
        emailImage: String

    }],
    customThemesAvailable: Boolean,
    handlingCharges: Array,
    reloadCardNumber: Boolean,
    expiry: String,
    formatExpiry: String,
    discounts: [
        {
            startDate: String,
            endDate: String,
            discount: {
                type: String,
                amount: Number,
                max: String,
                desc: String
            },
            coupon: {
                code: String
            },
            priority: Number
        }
    ],
    relatedProducts: [{
        sku: String,
        name: String,
        type: String,
        url: String,
        images: {
            base: String,
            small: String,
            mobile: String,
            thumbnail: String
        }
    }],
    storeLocatorUrl: String,
    brandName: String,
    etaMessage: String,
    cpg: {
        barcode: {
            encoding: String
        },
        redemptionTerms: [
            {
                id: String,
                text: String,
                redemptionTextType: String
            }
        ],
        type: String,
        code: String,
        erupi_purpose: String,
        erupi_payer_type: String,
        erupi_payee_type: String,
        erupi_recurrence_pattern: String,
        erupi_validity: String
    },
    payout: {
        enabled: Boolean,
        payment_methods: Array,
        account_types: Array,
        transaction_types: Array,
        maximum_beneficiaries: String,
        validate_terms_and_condition: String,
        validation: {
            amount: String,
            edit_beneficiary: Boolean,
            convenience_charge: String
        },
    },
    convenience_charge: {
        type: String,
        minimum_amount: String,
        maximum_amount: String,
        amount: String
    },
    allowed_fulfillments: [{
        code: String
    }],
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