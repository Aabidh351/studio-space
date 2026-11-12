
"use client";

import { useState} from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error("Unable to send reset link!")
        setError(error.message || "Unable to send reset link.");
        return;
      }
      toast.success("A reset link will be sent to your email.")
      setMessage("If an account exists with this email, a reset link will be sent.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md border border-[#e4e1d7] bg-[#fdfcf9] p-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
          Account Recovery
        </p>

        <h1 className="mt-3 font-heading text-4xl font-medium text-[#292b27]">
          Forgot Password?
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#74766d]">
          Enter your registered email address to receive a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-[#344638]">{message}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#344638] text-white hover:bg-[#435947]"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#74766d]">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-[#344638] hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
