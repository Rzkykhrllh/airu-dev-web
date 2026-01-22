import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

// This file enables Next.js standalone output to have a root entry point.
// You can add custom logic here if needed, or leave as is for default behavior.
