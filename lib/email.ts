// lib/email.ts

import { Resend } from "resend"; // Ensure you've installed the Resend SDK
import markdownToHtml from 'markdown-to-html'; // Ensure you've installed a markdown to HTML converter

const resend = new Resend('YOUR_RESEND_API_KEY'); // Replace with your actual API key

export async function sendPlanEmail(to: string, planMarkdown: string) {
    const planHtml = markdownToHtml(planMarkdown); // Convert markdown to HTML

    const email = {
        to,
        subject: "Your Personalized Fitness Plan",
        html: `
            <h1>Your Personalized Fitness Plan</h1>
            <div>${planHtml}</div>
        `,
    };

    try {
        const response = await resend.sendEmail(email);
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}