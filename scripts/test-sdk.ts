import { Resend } from 'resend';

const resend = new Resend('re_Leq51kWM_P9ViGRWmEYTrn6MbfQGKy2CX');

async function test() {
    console.log('Testing with SDK...');
    try {
        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: ['kickoffdevelopment@gmail.com'],
            subject: 'SDK Test',
            html: '<h1>SDK Test</h1>'
        });

        if (error) {
            console.error('SDK Error:', JSON.stringify(error, null, 2));
        } else {
            console.log('SDK Success:', data);
        }
    } catch (err) {
        console.error('SDK Crash:', err);
    }
}

test();
