
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  studioId: string;
  ownerEmail: string;
};

export default function DeleteStudioButton({
  studioId,
  ownerEmail,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this studio? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/studios/${studioId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete studio.");
      }

      toast.success("Studio deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-full border border-border px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
