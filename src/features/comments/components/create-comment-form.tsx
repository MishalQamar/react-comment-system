'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { User } from '@prisma/client';
import Link from 'next/link';
import { getInitials } from '../utils/get-initals';
import { useActionState } from 'react';
import { createComment } from '../action/create-comment';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';

type CreateFormProps = {
  user: User | null;
  entityId: string;
  entity: 'ARTICLE' | 'EPISODE';
};

export const CreateCommentForm = ({
  user,
  entityId,
  entity,
}: CreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, { entityId, entity }),
    EMPTY_ACTION_STATE
  );
  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex gap-3">
        {user && (
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {getInitials(user.username)}
            </AvatarFallback>
          </Avatar>
        )}

        <form action={action} className="flex-1 relative">
          <textarea
            name="comment"
            rows={3}
            placeholder={
              user
                ? 'Add your comment...'
                : 'Sign in to leave a comment...'
            }
            disabled={!user}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <FieldError actionState={actionState} name="comment" />
          <div className="mt-2 text-right">
            <button
              type="submit"
              disabled={!user}
              className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </div>
        </form>
      </div>

      {!user && (
        <p className="mt-2 text-sm text-gray-600 px-1 pb-10">
          <span className="font-medium">Please </span>
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline"
          >
            sign in
          </Link>{' '}
          or{' '}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline"
          >
            sign up
          </Link>{' '}
          to post a comment.
        </p>
      )}
    </div>
  );
};
