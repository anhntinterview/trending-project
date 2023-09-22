import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET HERE' });
}

export async function POST(request: NextRequest) {
  const { data } = await request.json();
  console.log(`data: `, data);
  return NextResponse.json({ message: data });
}

export async function PUT(request: NextRequest) {
  const { rs } = await request.json();
  console.log(`rs: `, rs);
  return NextResponse.json({ message: rs });
}

export async function PATCH(request: NextRequest) {
  const rs = await request.json();
  console.log(`rs: `, rs);
  return NextResponse.json({ message: rs });
}

export async function DELETE(request: NextRequest, { params }) {
  console.log(`params: `, params);
  return NextResponse.json({ message: `DELETE` });
}
