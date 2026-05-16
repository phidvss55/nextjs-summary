import { RequestPasswordForm } from '@/components/authentication/request-password-form';
import { authIsNotRequired } from '@/lib/auth-utils';

export default async function RequestPasswordPage() {
  await authIsNotRequired();

  return <RequestPasswordForm />;
}
