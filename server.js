const express = require('express');
const postmark = require('postmark');
const cors = require('cors');
const app = express();

// Replace with your Postmark server token
const client = new postmark.ServerClient("YOUR_POSTMARK_SERVER_TOKEN");

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve your HTML file from 'public' directory

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        await client.sendEmail({
            "From": "your-verified-sender@yourdomain.com",
            "To": "destination@yourdomain.com",
            "Subject": "New Contact Form Submission",
            "HtmlBody": `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
            "TextBody": `
                New Contact Form Submission
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 