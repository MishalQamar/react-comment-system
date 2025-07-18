'use client';

import { useActionState, useEffect } from 'react';

import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';
import { createReply } from '../action/create-reply';

type CreateFormProps = {
  entityId: string;
  entity: 'ARTICLE' | 'EPISODE';
  parentId: string;
  handleActiveMode: (mode: 'edit' | 'reply' | null) => void;
};

export const CreateReplyForm = ({
  entityId,
  entity,
  parentId,
  handleActiveMode,
}: CreateFormProps) => {
  const [actionState, action] = useActionState(
    createReply.bind(null, { entityId, entity, parentId }),
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
        name="reply"
        rows={2}
        className="w-full border border-gray-300 rounded p-1 text-xs resize-none"
        placeholder="Write a reply..."
      />
      <FieldError actionState={actionState} name="reply" />
      <div className="mt-1 flex gap-2 text-xs">
        <button
          type="submit"
          className="text-blue-600 hover:underline"
          /*  onClick={() => handleActiveMode(null)} */
        >
          Post Reply
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
