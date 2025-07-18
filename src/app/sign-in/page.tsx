import { CardCompact } from '@/components/card-compact';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <CardCompact
      title=" Sign in to your account"
      className="mx-auto mt-16 flow-root max-w-lg sm:mt-20"
      content={<SignInForm />}
      footer={
        <p className="mt-10 text-center text-sm">
          Don&apos;t have an account{' '}
          <Link href="#" className="font-semibold leading-6">
            Sign Up
          </Link>
        </p>
      }
    />
  );
};

export default SignInPage;
