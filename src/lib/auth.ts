import { cookies } from 'next/headers';

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: 'admin';
}

const SESSION_COOKIE_NAME = 'session';

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
    const user = JSON.parse(decoded) as SessionUser;
    
    if (!user.id || !user.email || !user.role) return null;
    return user;
  } catch {
    return null;
  }
}

export async function createSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies();
  const encoded = Buffer.from(JSON.stringify(user)).toString('base64');
  
  cookieStore.set(SESSION_COOKIE_NAME, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
