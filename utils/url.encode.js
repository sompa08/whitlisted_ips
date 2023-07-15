
function encodeURI(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    }).replace(/%20/g, '+');
  }
  

//   const encodedString = encodeURI('https://sandbox.woohoo.in/rest/v3/catalog/categories/121');
//   console.log(encodedString);

  module.exports = encodeURI; 