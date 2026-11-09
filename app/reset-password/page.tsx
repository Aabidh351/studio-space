
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-4">
        <div className="w-full max-w-md border border-[#e4e1d7] bg-[#fdfcf9] p-8 text-center">
          <h1 className="font-heading text-3xl font-medium text-[#292b27]">
            Invalid Reset Link
          </h1>

          <p className="mt-3 text-sm text-[#74766d]">
            This password reset link is missing its token. Please request a new one.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-4 py-12">
      <ResetPasswordForm token={token} />
    </main>
  );
}
