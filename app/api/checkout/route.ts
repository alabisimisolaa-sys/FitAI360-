import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
});

export async function POST(request: Request) {
  const intakeData = await request.json();
  const { email, amount, metadata } = intakeData;

  // Validate required fields
  if (!email || !amount) {
    return NextResponse.json({ error: 'Email and amount are required fields.' }, { status: 400 });
  }

  // Chunks metadata if it's too large
  const metadataChunks = chunkMetadata(metadata);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Checkout Session',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.APP_URL}/success`,
      cancel_url: `${process.env.APP_URL}/cancel`,
      metadata: metadataChunks,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}

function chunkMetadata(metadata: object): object {
  const chunked = {};
  const MAX_SIZE = 500; // Max size in bytes

  Object.entries(metadata).forEach(([key, value]) => {
    if (Buffer.byteLength(JSON.stringify(value)) > MAX_SIZE) {
      chunked[key] = JSON.stringify(value).substring(0, MAX_SIZE);
    } else {
      chunked[key] = value;
    }
  });

  return chunked;
}