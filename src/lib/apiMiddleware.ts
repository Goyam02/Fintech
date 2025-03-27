import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSessionUser } from './auth';
import type { NextRequest } from 'next/server';

export interface AuthenticatedRequest extends NextRequest {
  user: Awaited<ReturnType<typeof getSessionUser>>;
}

export async function withAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  try {
    const sessionCookies = await cookies();
    const sessionId = sessionCookies.get('session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getSessionUser(sessionId);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Add user to request object
    const authReq = req as AuthenticatedRequest;
    authReq.user = user;

    return handler(authReq);
  } catch (error) {
    console.error('API auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
