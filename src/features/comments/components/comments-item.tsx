'use client';
import { formatDistanceToNowStrict } from 'date-fns';

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';

import { useState } from 'react';
import { getInitials } from '../utils/get-initals';
import { isOwner } from '@/features/auth/utilis/is-owner';
import { CreateReplyForm } from './create-reply-form';
import { deleteComment } from '../action/delete-comment';
import { EditCommentForm } from './edit-comment-form';
import { Comment } from '../types/types';
import { User } from '@prisma/client';

type CommentItemProps = {
  comment: Comment;
  authUser: User | null;
};

export const CommentItem = ({
  comment,
  authUser,
}: CommentItemProps) => {
  const [activeMode, setActiveMode] = useState<
    'edit' | 'reply' | null
  >(null);
  const isCommentOwner = isOwner(authUser, comment);

  const replyButton = !comment.parentId ? (
    <button
      className="hover:text-blue-600"
      onClick={() =>
        setActiveMode(activeMode === 'reply' ? null : 'reply')
      }
    >
      Reply
    </button>
  ) : null;

  const editButton = isCommentOwner && (
    <button
      className="hover:text-yellow-600"
      onClick={() =>
        setActiveMode(activeMode === 'edit' ? null : 'edit')
      }
    >
      Edit
    </button>
  );

  const handleDelete = (commentId: string) => {
    deleteComment(commentId);
  };

  const deleteButton = isCommentOwner && (
    <button
      className="hover:text-red-600"
      onClick={() => {
        handleDelete(comment.id);
      }}
    >
      Delete
    </button>
  );

  return (
    <li className="flex gap-2 mb-2">
      <Avatar className="flex-shrink-0 w-8 h-8">
        <AvatarImage />
        <AvatarFallback className="text-xs">
          {getInitials(comment.user.username)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 border border-gray-300 rounded p-2 bg-white">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-900">
            {comment.user?.username ?? 'Anonymous'}
          </span>
          <span className="text-[10px] text-gray-400">
            {formatDistanceToNowStrict(new Date(comment.createdAt))}
          </span>
        </div>

        {activeMode === 'edit' ? (
          <EditCommentForm
            comment={comment}
            handleActiveMode={setActiveMode}
          />
        ) : (
          <p className="text-xs text-gray-700 mb-1">{comment.text}</p>
        )}

        <div className="flex gap-3 text-[10px] text-gray-600 mt-1">
          {authUser ? (
            <>
              {replyButton}
              {editButton}
              {deleteButton}
            </>
          ) : null}
        </div>

        {!comment.parentId && activeMode === 'reply' && (
          <div className="mt-2 ml-4">
            <CreateReplyForm
              entity={comment.entity}
              entityId={comment.articleId ?? comment.episodeId ?? ''}
              parentId={comment.id}
              handleActiveMode={setActiveMode}
            />
          </div>
        )}

        {'replies' in comment && comment.replies.length > 0 && (
          <ul className="mt-2 space-y-2 ml-6">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                authUser={authUser}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};
