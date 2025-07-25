import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { Session, User } from '@prisma/client';

import { sha256 } from '@oslojs/crypto/sha2';
import prisma from '@/lib/prisma';

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}
export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token))
  );
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token))
  );
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (result === null) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });

    return { session: null, user: null };
  }
  if (
    Date.now() >=
    session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
  ) {
    session.expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    );
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string) {
  await prisma.session.delete({ where: { id: sessionId } });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
