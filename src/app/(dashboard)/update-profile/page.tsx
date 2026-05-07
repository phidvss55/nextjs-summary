import { updateProfile } from '@/app/api/libs/user';
import { ChangePasswordForm } from '@/components/authentication/change-password-form';
import { ToggleOtpForm } from '@/components/authentication/toggle-otp-form';
import { UpdateProfile } from '@/components/authentication/update-profile';
import { authIsRequired } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';

export default async function UpdateProfilePage() {
  await authIsRequired();
  const user = await updateProfile();

  if (!user) redirect('/sign-in');

  return (
    <div className="w-full p-6 shadow-lg mx-auto max-w-7xl min-h-dvh rounded-2xl h-full flex gap-6 justify-center items-start">
      <UpdateProfile email={user.email} name={user.name ?? ''} image={user.image ?? ''} />
      <ChangePasswordForm />

      <ToggleOtpForm twoFactorEnabled={user.twoFactorEnabled} />
    </div>
  );
}
