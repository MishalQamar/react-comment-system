'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import prisma from '@/lib/prisma';
import { articlePath, episodePath } from '@/paths';

// Zod schema for validation
const createCommentSchema = z.object({
  comment: z.string().min(1, 'Comment field is required'),
});

type CreateCommentArgs = {
  entityId: string;
  entity: 'ARTICLE' | 'EPISODE';
};

export const createComment = async (
  { entityId, entity }: CreateCommentArgs,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const { comment } = createCommentSchema.parse(
      Object.fromEntries(formData)
    );

    switch (entity) {
      case 'ARTICLE':
        await prisma.comment.create({
          data: {
            entity: 'ARTICLE',
            text: comment,
            user: { connect: { id: user.id } },
            article: { connect: { id: entityId } },
          },
        });
        break;

      case 'EPISODE':
        await prisma.comment.create({
          data: {
            entity: 'EPISODE',
            text: comment,
            user: { connect: { id: user.id } },
            episode: { connect: { id: entityId } },
          },
        });
        break;

      default:
        return toActionState('Invalid entity', 'ERROR');
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  if (entity === 'ARTICLE') {
    revalidatePath(articlePath());
  } else if (entity === 'EPISODE') {
    revalidatePath(episodePath());
  }

  return toActionState('Comment created successfully', 'SUCCESS');
};
