async function testRegister() {
    const response = await fetch('http://localhost:3000/api/venezuela-en-el-cuerpo/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            whatsapp: '123456789',
            city: 'caracas'
        }),
    });
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', data);
}

testRegister();
