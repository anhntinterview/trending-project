import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }) {
  const { searchParams } = request.nextUrl;
  console.log(`searchParams: `, searchParams);
  console.log(`params: `, params);
  return NextResponse.json({ message: `GOT` });
}

// export async function DELETE(request: NextRequest, { params }) {
//   const { searchParams } = request.nextUrl;
//   console.log(`searchParams: `, searchParams.values());
//   console.log(`params: `, params);
//   return NextResponse.json({ message: `DELETE` });
// }

export async function POST(request: NextRequest, { params }) {
  const { data } = await request.json();
  console.log(`data: `, data);
  console.log(`searchParams: `, request.nextUrl.searchParams);
  console.log(`params: `, params);
  return NextResponse.json({ message: `POSTED` });
}
