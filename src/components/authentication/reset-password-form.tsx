'use client';

import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';

const formSchema = z
  .object({
    newPassword: z.z.string().min(6, 'Invalid password'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

type ResetPasswordFormProps = {
  token: string | null;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async ({ newPassword }: z.infer<typeof formSchema>) => {
    if (!token) {
      toast.error('Reset token is missing or invalid.');
      return;
    }

    try {
      await authClient.resetPassword(
        { newPassword, token },
        {
          onSuccess: async () => {
            router.push('/');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch {
      throw new Error('Something went wrong');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Enter your email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6" id="reset-password">
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel>New password</FieldLabel>
                  <Input {...field} autoComplete="off" type="password" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="confirmNewPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel>Confirm new password</FieldLabel>
                  <Input {...field} autoComplete="off" type="password" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="cursor-pointer max-w-40 self-end" disabled={form.formState.isSubmitting} form="reset-password">
            {form.formState.isSubmitting ? <Spinner className="size-6" /> : 'Reset password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
