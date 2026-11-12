
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  if (
    password.length < 6 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password)
  ) {
    const message =
      "Password must contain uppercase and lowercase letters and at least 6 characters.";

    setError(message);
    toast.error("Invalid Password", { description: message });
    return;
  }

  if (password !== confirmPassword) {
    const message = "Passwords do not match.";

    setError(message);
    toast.error("Password Mismatch", { description: message });
    return;
  }

  setLoading(true);

  try {
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (error) {
      const message = error.message || "Unable to reset password.";

      toast.error("Password Reset Failed", {
        description: message,
      });

      setError(message);
      return;
    }

    toast.success("Your password was successfully reset.");

    router.push("/login");
    router.refresh();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

    toast.error("Password Reset Failed", {
      description: message,
    });

    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md border border-[#e4e1d7] bg-[#fdfcf9] p-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
          Account Security
        </p>

        <h1 className="mt-3 font-heading text-4xl font-medium text-[#292b27]">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-[#74766d]">
          Create a new password for your StudioSpace account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="pr-12"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74766d] hover:text-[#344638]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="text-xs text-[#74766d]">
            At least 6 characters, including uppercase and lowercase letters.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="pr-12"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74766d] hover:text-[#344638]"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#344638] text-white hover:bg-[#435947]"
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
