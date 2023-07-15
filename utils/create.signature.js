const cryptoJS = require("crypto-js");

function createsignature() {
    var requestBody =
    {
        "address": {
            "billToThis": true,
            "city": "bangalore",
            "code": "123",
            "country": "IN",
            "email": "jhon.deo@gmail.com",
            "firstname": "Jhon",
            "gstn": "1234567890",
            "lastname": "Deo",
            "line1": "address details1",
            "line2": "address details 2",
            "postcode": "560076",
            "region": "Karnataka",
            "salutation": "Mr.",
            "telephone": "+919999999999"
        },
        "billing": {
            "city": "bangalore",
            "code": "abc",
            "company": "Accenture",
            "country": "IN",
            "email": "jhon.deo@gmail.com",
            "firstname": "Jhon ",
            "gstn": "123456",
            "lastname": "Deo",
            "line1": "address details1",
            "line2": "address details 2",
            "postcode": "560076",
            "region": "Karnataka",
            "salutation": "Mr.",
            "telephone": "+919999999999"
        },
        "cardnumber": "7998892010000285",
        "coBrandImageId": "co_brand_image_id",
        "couponCode": "DISC100",
        "deliveryMode": "API",
        "egvDeliveryType": "MULTIPLE",
        "isConsolidated": false,
        "orderType": "FULFILLMENT_BY_SELLER",
        "otp": "12345",
        "outletName": "2773 - SydneyOutlet",
        "payments": [
            {
                "amount": 1000,
                "code": "svc",
                "mode": "ANY",
                "poDate": "2022-06-29 6:11:50",
                "poNumber": "johndeo01"
            }
        ],
        "products": [
            {
                "cardNumber": "7998892010000285",
                "coBrandImageId": "wowth1",
                "currency": 356,
                "giftMessage": "",
                "packaging": "minimal_packaging",
                "payout": { // for bank account
                    "accountNumber": "1234567890123456",
                    "email": "test@gmail.com",
                    "ifscCode": "001000000abc",
                    "name": "abc test",
                    "telephone": "+91888888888",
                    "transactionType": "IMPS",
                    "type": "BANK_ACCOUNT"
                },
                "price": 1000,
                "qty": 1,
                "reloadCardNumber": "7998892010000285",
                "sku": "EGVGBTNS001",
                "theme": "bwi",
                "trackData": ";7998892010000285=000000101068785?"
            }
        ],
        "refno": "001000000abc",
        "remarks": "Gift card",
        "shipping": {
            "method": "wowregisteredpost"
        },
        "syncOnly": false
    };

    var requestHttpMethod = 'get';


    var absApiUrl = 'https://sandbox.woohoo.in/rest/v3/catalog/categories/121/products?limit=10&offset=0';

    var clientSecret = '294957ae7e73e64b6322b9af5af4e1cc';

    /**
     * Sorts the parameters according to the ASCII table.
     */
    let sortObject = (object) => {
        if (object instanceof Array) {
            var sortedObj = [],
                keys = Object.keys(object);
        }
        else {
            sortedObj = {},
                keys = Object.keys(object);
        }

        keys.sort(function (key1, key2) {
            if (key1 < key2) return -1;
            if (key1 > key2) return 1;
            return 0;
        });

        for (var index in keys) {
            var key = keys[index];
            if (typeof object[key] == 'object') {
                if ((object[key] instanceof Array)) {
                    sortedObj[key] = sortObject(object[key]);
                }
                sortedObj[key] = sortObject(object[key]);
            } else {
                sortedObj[key] = object[key];
            }
        }
        return sortedObj;
    }

    /**
     * Sort all query parameters in the request according to the parameter name in ASCII table.
     */
    let sortQueryParams = () => {
        var url = absApiUrl.split('?'),
            baseUrl = url[0],
            queryParam = url[1].split('&');

        absApiUrl = baseUrl + '?' + queryParam.sort().join('&');

        return fixedEncodeURIComponent(absApiUrl);
    }

    /**
     * Concat the (request method(upper case), request host, request URL), encoded request parameters and encoded query parameters using & as the separator.
     */
    let getConcatenateBaseString = () => {
        var baseArray = [];
        baseArray.push(requestHttpMethod.toUpperCase());

        if (absApiUrl.indexOf('?') >= 0) {
            baseArray.push(sortQueryParams());
        } else {
            baseArray.push(fixedEncodeURIComponent(absApiUrl));
        }
        if (requestHttpMethod === 'post') {
            baseArray.push(fixedEncodeURIComponent(JSON.stringify(sortObject(requestBody))));
        }
        console.log('baseArray', baseArray.join('&'))
        return baseArray.join('&');
    }

    let fixedEncodeURIComponent = (str) => {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16).toUpperCase();
        });
    }
    const signature = cryptoJS.HmacSHA512(getConcatenateBaseString(), clientSecret).toString();
    return signature;
}


module.exports = createsignature;