'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utilis/is-owner';
import prisma from '@/lib/prisma';
import { articlePath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const editCommentSchema = z.object({
  text: z.string().min(1, 'Comment field is required'),
});

export const editComment = async (
  commentId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState('not authorised', 'ERROR');
  }

  try {
    const { text } = editCommentSchema.parse(
      Object.fromEntries(formData)
    );

    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        text,
      },
    });
  } catch (error) {
    fromErrorToActionState(error);
  }

  revalidatePath(articlePath());

  return toActionState('Comment created successfully', 'SUCCESS');
};
