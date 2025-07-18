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
const createReplySchema = z.object({
  reply: z.string().min(1, 'reply field is required'),
});

type CreateReplyArgs = {
  entityId: string;
  entity: 'ARTICLE' | 'EPISODE';
  parentId: string;
};

export const createReply = async (
  { entityId, entity, parentId }: CreateReplyArgs,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const { reply } = createReplySchema.parse(
      Object.fromEntries(formData)
    );

    switch (entity) {
      case 'ARTICLE':
        await prisma.comment.create({
          data: {
            entity: 'ARTICLE',
            text: reply,

            user: { connect: { id: user.id } },
            article: { connect: { id: entityId } },
            parent: { connect: { id: parentId } },
          },
        });

        break;

      case 'EPISODE':
        await prisma.comment.create({
          data: {
            entity: 'EPISODE',
            text: reply,
            user: { connect: { id: user.id } },
            episode: { connect: { id: entityId } },
            parent: { connect: { id: parentId } },
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

  return toActionState('Reply created successfully', 'SUCCESS');
};
