import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { id: '1', name: 'Maria Oliveira' },
    { id: '2', name: 'Carlos Souza' },
  ];

  return NextResponse.json(data);
}
