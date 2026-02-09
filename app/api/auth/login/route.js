import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { passcode } = await req.json();

        // Check against environment variable or default
        const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "8888";

        if (passcode === ADMIN_PASSCODE) {
            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
    }
}
