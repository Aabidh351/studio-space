import LoginForm from "@/components/auth/LoginForm";

type Props = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams;

  const redirectTo =
    redirect?.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/";

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f7f5ef] px-6 py-16">
      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}