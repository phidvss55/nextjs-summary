import { authIsRequired } from '@/lib/auth-utils';

export default async function Home() {
  await authIsRequired();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 my-auto">
      <h1 className="text-4xl font-bold opacity-75">Home page</h1>
    </div>
  );
}
