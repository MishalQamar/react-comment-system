'use server';

import { redirect } from 'next/navigation';

import { homePath, signInPath } from '@/paths';
import { invalidateSession } from '../utilis/session';
import { deleteSessionTokenCookie } from '../utilis/session-cookie';
import { getAuth } from './get-auth';

export const SignOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  redirect(homePath());
};
