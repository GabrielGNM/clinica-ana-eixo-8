import { NextResponse } from 'next/server';

export async function GET() {
  // Aqui você chamaria seu backend real, mas vou simular com dados fake
  const data = [
    { id: '1', name: 'Dr. Ana' },
    { id: '2', name: 'Dr. João' },
  ];

  return NextResponse.json(data);
}