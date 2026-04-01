require('dotenv').config({ path: '.env' });

async function checkEmails() {
    try {
        const response = await fetch('https://api.resend.com/emails', {
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            }
        });
        
        const data = await response.json();
        
        if (data && data.data) {
            const summary = data.data.map(email => ({
                date: email.created_at,
                subject: email.subject,
                to: email.to[0],
                status: email.last_event
            }));
            console.log(JSON.stringify(summary, null, 2));
        } else {
            console.log("No data:", data);
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

checkEmails();
