const https = require('https');

const data = JSON.stringify({
    from: 'onboarding@resend.dev',
    to: ['kickoffdevelopment@gmail.com'],
    subject: 'Test with different key',
    html: '<h1>Test</h1>'
});

const options = {
    hostname: 'api.resend.com',
    path: '/emails',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_AqeZBuQR_47orL4Ds3bp5wPKLtx7AViMw',
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
