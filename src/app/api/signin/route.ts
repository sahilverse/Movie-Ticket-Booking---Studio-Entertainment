import { NextRequest, NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();



}
