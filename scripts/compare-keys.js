const https = require('https');

function sendTest(key, label) {
    const data = JSON.stringify({
        from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
        to: ['kickoffdevelopment@gmail.com'],
        subject: `Test with ${label}`,
        html: '<h1>Test</h1>'
    });

    const options = {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (d) => { responseBody += d; });
        res.on('end', () => { 
            console.log(`Response for ${label} (${res.statusCode}):`, responseBody); 
        });
    });

    req.on('error', (error) => { console.error(`Error for ${label}:`, error); });
    req.write(data);
    req.end();
}

// From .env
sendTest('re_AqeZBuQR_47orL4Ds3bp5wPKLtx7AViMw', '.env key');
// From .env.local
sendTest('re_Leq51kWM_P9ViGRWmEYTrn6MbfQGKy2CX', '.env.local key');
