const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whitelist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        image: String,
        thumbnail: String,
    },
    productsCount: {
        type: Number,
    },
    products: [
        {
            sku: String,
            name: String,
            currency: {
                code: String,
                symbol: String,
                numericCode: String,
            },
        }
    ],
    url:{
        type: String,
    },
    minPrice:{
        type: String,
    },
    maxPrice:{
        type: String,
    },
    createdAt:{
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

const Products = mongoose.model('products', productSchema);

module.exports = Products;