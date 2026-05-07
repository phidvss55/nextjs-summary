import { OtpCodeForm } from '@/components/authentication/otp-code-form';
import { authIsNotRequired } from '@/lib/auth-utils';

export default async function TwoFactorCodePage() {
  await authIsNotRequired();

  return <OtpCodeForm />;
}
