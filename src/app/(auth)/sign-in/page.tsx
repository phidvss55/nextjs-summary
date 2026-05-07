import { SignInForm } from '@/components/authentication/sign-in-form';
import { authIsNotRequired } from '@/lib/auth-utils';

export default async function SignInPage() {
  await authIsNotRequired();

  return <SignInForm />;
}
