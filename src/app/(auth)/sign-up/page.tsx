import { SignUpForm } from '@/components/authentication/sign-up-form';
import { authIsNotRequired } from '@/lib/auth-utils';

export default async function SignInPage() {
  await authIsNotRequired();

  return <SignUpForm />;
}
