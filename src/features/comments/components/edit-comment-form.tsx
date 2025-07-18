'use client';
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
} from 'react';
import { Comment } from '../types/types';
import { editComment } from '../action/edit-comment';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';

type EditCommentFormProps = {
  comment: Comment;
  handleActiveMode: Dispatch<SetStateAction<'edit' | 'reply' | null>>;
};

export const EditCommentForm = ({
  comment,
  handleActiveMode,
}: EditCommentFormProps) => {
  const [actionState, action] = useActionState(
    editComment.bind(null, comment.id),
    EMPTY_ACTION_STATE
  );

  useEffect(() => {
    if (actionState.status === 'SUCCESS') {
      handleActiveMode(null);
    }
  }, [actionState, handleActiveMode]);

  return (
    <form action={action}>
      <textarea
        name="text"
        className="w-full border border-gray-300 rounded p-1 text-xs resize-none"
        defaultValue={comment.text}
        rows={2}
      />

      <FieldError actionState={actionState} name="text" />
      <div className="mt-1 flex gap-2 text-xs">
        <button
          className="text-blue-600 hover:underline"
          type="submit"
        >
          Save
        </button>
        <button
          className="text-gray-500 hover:underline"
          onClick={() => handleActiveMode(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
