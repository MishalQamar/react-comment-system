'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { validateSessionToken } from '../utilis/session';

export const getAuth = cache(async () => {
  const token = (await cookies()).get('session')?.value ?? null;

  if (!token) {
    return {
      user: null,
      session: null,
    };
  }

  return await validateSessionToken(token);
});
