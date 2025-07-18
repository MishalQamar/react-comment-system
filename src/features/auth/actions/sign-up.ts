'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { homePath } from '@/paths';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { z } from 'zod';
import { hashPassword } from '../utilis/hash-verfiy';
import {
  generateSessionToken,
  createSession,
} from '../utilis/session';
import { setSessionTokenCookie } from '../utilis/session-cookie';

import { redirect } from 'next/navigation';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(99)
      .refine(
        (value) => !value.includes(' '),
        'username cannot contain spaces'
      ),
    email: z
      .string()
      .min(1, { message: 'Is required' })
      .max(191)
      .email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const signUp = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: await hashPassword(password),
      },
    });

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    await setSessionTokenCookie(token, session.expiresAt);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toActionState(
        'email or username already in use',
        'ERROR',
        formData
      );
    }

    return fromErrorToActionState(error, formData);
  }
  console.log('problem');

  redirect(homePath());
};
