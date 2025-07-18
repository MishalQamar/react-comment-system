'use server';

import { toActionState } from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utilis/is-owner';
import prisma from '@/lib/prisma';
import { articlePath } from '@/paths';
import { revalidatePath } from 'next/cache';

export const deleteComment = async (commentId: string) => {
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState('not authorised', 'ERROR');
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(articlePath());
};
