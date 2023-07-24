const cryptoJS = require("crypto-js");
function createsignature(method, URL, data) {
    // let data1= {"address":{"city":"bangalore","country":"IN","firstname":"Jhon","postcode":"560076"},"billing":{"city":"bangalore","country":"IN","firstname":"Jhon","postcode":"560076","region":"Karnataka"},"couponCode":"DISC100","payments":[{"amount":1000,"code":"svc","poNumber":"johndeo01"}],"products":[{"currency":356,"payout":["Object"],"price":1000,"qty":1,"sku":"EGCGBFK001"}],"refno":"001000000abc","syncOnly":false};
    // let data2={"cards":[{"name":"ABC XYZ","email":"abc@xyz.com","id":208,"telephone":"+911234567890"},{"name":"BCD WXY","email":"def@xyz.com","id":207,"telephone":"+911234567800"}]}
    // console.log('methodmethodmethod',method,URL,data);
    var requestBody = data;
    var requestHttpMethod = method;


    var absApiUrl = URL;

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
        // console.log('sortedObj',sortedObj);
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