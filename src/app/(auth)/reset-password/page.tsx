import { ResetPasswordForm } from '@/components/authentication/reset-password-form';
import { authIsNotRequired } from '@/lib/auth-utils';

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string | string[];
  }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  await authIsNotRequired();
  const params = await searchParams;
  const token = Array.isArray(params.token) ? params.token[0] : params.token ?? null;

  return <ResetPasswordForm token={token} />;
}
