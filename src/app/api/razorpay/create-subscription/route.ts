
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const { plan_id } = await req.json();

  if (!plan_id) {
    return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const options = {
    plan_id: plan_id,
    total_count: 12, // This is for a yearly subscription, you might want to make this dynamic
    quantity: 1,
    customer_notify: 1,
    notes: {
      reference_id: uuidv4(),
    }
  };

  try {
    const subscription = await razorpay.subscriptions.create(options);
    return NextResponse.json({
      id: subscription.id,
      plan_id: subscription.plan_id,
      status: subscription.status,
    });
  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
