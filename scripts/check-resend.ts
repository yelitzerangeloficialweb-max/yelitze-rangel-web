import * as dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
    console.log('--- Listing Recent Emails to check Scheduled status ---');
    try {
        const { data, error } = await resend.emails.list({ limit: 100 });
        
        if (error) {
            console.error('Error listing emails:', error);
            return;
        }

        if (!data || !data.data) {
            console.log('No data found.');
            return;
        }

        console.log(`Found ${data.data.length} emails in the last 100 logs.`);
        
        // Count how many are scheduled and what subjects
        const subjects = {};
        let scheduledCount = 0;

        for (const email of data.data) {
            // Note: resend.emails.list usually doesn't return the full status for scheduled unless you get the specific ID, 
            // but let's see what more we can find. Resend docs say it has 'id', 'subject', 'to', 'created_at'.
            // Actually, in some versions it might have status.
            
            console.log(`- [${email.created_at}] ID: ${email.id} | Subject: ${email.subject} | To: ${email.to}`);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

main();
