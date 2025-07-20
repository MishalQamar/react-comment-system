import {
  ActionState,
  toActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { homePath } from '@/paths';
import { redirect } from 'next/navigation';
import z from 'zod';
import { verifyPasswordHash } from '../utilis/hash-verfiy';
import {
  generateSessionToken,
  createSession,
} from '../utilis/session';
import { setSessionTokenCookie } from '../utilis/session-cookie';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
  password: z.string().min(6).max(191),
});

export const signIn = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return toActionState(
        'Incorrect email or password',
        'ERROR',

        formData
      );
    }

    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      password
    );

    if (!validPassword) {
      return toActionState(
        'Incorrect email or password',
        'ERROR',

        formData
      );
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    await setSessionTokenCookie(token, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(homePath());
};
