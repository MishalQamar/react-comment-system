'use client';

import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { signUp } from '../actions/sign-up';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';

import { FieldError } from '@/components/form/field-error';

const SignUpForm = () => {
  const [actionState, action] = useActionState(
    signUp,
    EMPTY_ACTION_STATE
  );
  return (
    <form action={action}>
      <Label
        htmlFor="username"
        className="block text-sm font-medium leading-6"
      >
        Username
      </Label>

      <Input
        id="username"
        name="username"
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mb-4"
      />

      <FieldError actionState={actionState} name="username" />

      <Label
        htmlFor="email"
        className="block text-sm font-medium leading-6 mt-2"
      >
        Email address
      </Label>

      <Input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mb-4"
      />

      <FieldError actionState={actionState} name="email" />

      <Label
        htmlFor="password"
        className="block text-sm font-medium leading-6 mt-2"
      >
        Password
      </Label>

      <Input
        id="password"
        name="password"
        type="password"
        required
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mb-4 "
      />

      <FieldError actionState={actionState} name="password" />

      <Label
        htmlFor="confirmPassword"
        className="block text-sm font-medium leading-6 mt-2"
      >
        ConfirmPassword
      </Label>

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mb-4 "
      />

      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </form>
  );
};

export { SignUpForm };
