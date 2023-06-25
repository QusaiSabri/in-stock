var unirest = require('unirest');

var req = unirest('POST', 'https://d7sms.p.rapidapi.com/secure/send');

req.headers({
  authorization: 'Basic XXXXXXX',
  'x-rapidapi-host': 'RAPIDAPI-HOST',
  'x-rapidapi-key': 'RAPIDAPI-KEY',
  'content-type': 'application/json',
  accept: 'application/json',
  useQueryString: true
});

req.type('json');
req.send({
  content: 'The RTX 3080 is available!',
  from: 'NAME ',
  to: PHONENUMBER
});

req.end(function(res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
