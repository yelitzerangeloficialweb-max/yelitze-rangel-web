const fetch = require('node-fetch');

async function testRegistration() {
    try {
        const res = await fetch('http://localhost:3000/api/sanate-mujer/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                whatsapp: '+1234567890',
                city: 'Test City'
            })
        });
        
        const data = await res.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testRegistration();
