const https = require('https');

const data = JSON.stringify({
    from: 'onboarding@resend.dev',
    to: ['kickoffdevelopment@gmail.com'],
    subject: 'Test from onboarding@resend.dev',
    html: '<h1>It works!</h1>'
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
