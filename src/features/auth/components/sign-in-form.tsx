'use client';

import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useActionState } from 'react';

import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { signIn } from '../actions/sign-in';

const SignInForm = () => {
  const [actionState, action] = useActionState(
    signIn,
    EMPTY_ACTION_STATE
  );
  return (
    <form action={action}>
      <Label
        htmlFor="email"
        className="block text-sm font-medium leading-6"
      >
        Email address
      </Label>

      <Input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mt-2"
      />
      <FieldError actionState={actionState} name="email" />

      <div className="flex items-center justify-between mt-2">
        <Label
          htmlFor="password"
          className="block text-sm font-medium leading-6 mt-2"
        >
          Password
        </Label>
        <div className="text-sm">
          <Link href="#" className="font-semibold">
            Forgot password?
          </Link>
        </div>
      </div>

      <Input
        id="password"
        name="password"
        type="password"
        required
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mt-2 "
      />

      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </form>
  );
};

export { SignInForm };
