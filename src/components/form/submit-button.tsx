'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LucideLoaderCircle } from 'lucide-react';

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-2">
      {pending && (
        <LucideLoaderCircle className="mr-2 animate-spin" />
      )}

      {label}
    </Button>
  );
};

export { SubmitButton };
