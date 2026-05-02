const https = require('https');

const ownerEmail = 'yelitzerangeloficialweb@gmail.com';
const data = JSON.stringify({
    from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
    to: [ownerEmail],
    subject: 'Test delivery to owner',
    html: '<h1>If you receive this, Resend is working but only for you.</h1><p>This confirms the domain is not verified for external recipients.</p>'
});

const options = {
    hostname: 'api.resend.com',
    path: '/emails',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_Leq51kWM_P9ViGRWmEYTrn6MbfQGKy2CX',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (d) => { responseBody += d; });
    res.on('end', () => { console.log('Response:', responseBody); });
});

req.on('error', (error) => { console.error(error); });
req.write(data);
req.end();
