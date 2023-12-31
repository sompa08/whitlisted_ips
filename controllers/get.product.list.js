const Inventories = require('../models/inventory');

async function getProductList(req, res) {
    let sku = req.query.sku;

    const catalogCategoriesProducts = await Inventories.findOne({ sku: sku }).exec();

    if (!catalogCategoriesProducts.length > 0) {
        return res.status(400).send({ status: 400, name: 'customerror', message: 'Data not found' })
    } else {
        return res.status(200).send({ status: 200, data: catalogCategoriesProducts });
    }
}

module.exports = getProductList;
