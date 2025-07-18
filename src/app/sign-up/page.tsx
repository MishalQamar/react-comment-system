import { CardCompact } from '@/components/card-compact';

import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { signInPath } from '@/paths';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <CardCompact
      title=" Sign Up to create account"
      className="mx-auto mt-16 flow-root max-w-lg sm:mt-20"
      content={<SignUpForm />}
      footer={
        <p className="mt-10 text-center text-sm">
          Have an account{' '}
          <Link
            href={signInPath()}
            className="font-semibold leading-6"
          >
            Sign In
          </Link>
        </p>
      }
    />
  );
};

export default SignUpPage;
