import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export async function POST(req: Request) {
  try {
    const sessionId = await req.json();

    // Retrieve the Stripe Checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Reconstruct intake data from session metadata
    const intakeData = reconstructIntakeData(session.metadata);

    // Generate personalized fitness plans using Gemini API
    const fitnessPlan = await generateFitnessPlan(intakeData);

    // Send the fitness plan via Resend
    await sendEmail(intakeData.email, fitnessPlan);

    return NextResponse.json({ success: true, fitnessPlan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

function reconstructIntakeData(metadata: any): any {
  // Logic to reconstruct intake data
  return {
    email: metadata.email,
    goals: metadata.goals,
    preferences: metadata.preferences,
  };
}

async function generateFitnessPlan(intakeData: any): Promise<any> {
  const response = await axios.post('https://api.gemini.com/generate', {
    input: intakeData,
  });
  return response.data;
}

async function sendEmail(email: string, fitnessPlan: any): Promise<void> {
  await axios.post('https://api.resend.com/send', {
    to: email,
    subject: 'Your Personalized Fitness Plan',
    body: JSON.stringify(fitnessPlan, null, 2),
  });
}