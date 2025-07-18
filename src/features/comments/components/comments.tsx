import { getAuth } from '@/features/auth/actions/get-auth';

import { CommentEntity } from '@prisma/client';
import { CreateCommentForm } from './create-comment-form';

import { CommentItem } from './comments-item';
import { getComments } from '../action/get-comments';

type CommentProps = {
  entity: CommentEntity;
  entityId: string;
};

export const Comments = async ({
  entity,
  entityId,
}: CommentProps) => {
  const comments = await getComments(entity, entityId);
  const { user } = await getAuth();

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-3 space-y-8">
        <ul className="space-y-3">
          {comments
            .filter((comment) => comment.parentId === null) // only root-level comments
            .map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                authUser={user}
              />
            ))}
        </ul>
      </div>
      <CreateCommentForm
        user={user}
        entityId={entityId}
        entity={entity}
      />
    </>
  );
};
