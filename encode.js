const url = 'https://sandbox.woohoo.in/rest/v3/orders/1000000028/resend';
const params = {"cards":[{"name":"ABC XYZ","email":"abc@xyz.com","id":208,"telephone":"+911234567890"}]};
const encodedParams = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');

const encodedUrl = `${url}?${encodedParams}`;

console.log(encodedUrl);