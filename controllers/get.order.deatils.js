const Orders = require('../models/order');

async function getOrderDeatils(req, res) {
    let orderId = req.query.orderId;
    const orderDetails = await Orders.findOne({ orderId: orderId }).exec();

    if (!orderDetails) {
        return res.status(400).send({ status: 400, name: 'customerror', message: 'Data not found' })
    } else {
        return res.status(200).send({ status: 200, data: orderDetails });
    }
}

module.exports = getOrderDeatils;
