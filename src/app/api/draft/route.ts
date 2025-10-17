import { NextRequest, NextResponse } from 'next/server';
import { generateEmailReply } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { subject, sender, content } = await req.json();

    if (!subject || !sender || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const draft = await generateEmailReply({ subject, sender, body: content });
    return NextResponse.json(draft);
  } catch (error) {
    console.error('Error generating draft:', error);
    return NextResponse.json({ error: 'Failed to generate draft' }, { status: 500 });
  }
}