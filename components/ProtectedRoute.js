"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
export default function ProtectedRoute({ children }) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);
  if (status === "loading" || status === "unauthenticated") {
    return <LoadingSpinner label="Checking your session..." />;
  }
  return children;
}