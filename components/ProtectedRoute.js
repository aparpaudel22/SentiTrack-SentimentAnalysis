"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import TosModal from "./TosModal";

function tosKey(email) {
  return `sentitrack-tos-accepted-${email}`;
}

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [tosAccepted, setTosAccepted] = useState(true);
  const [tosChecked, setTosChecked] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const accepted = window.localStorage.getItem(tosKey(session.user.email));
      setTosAccepted(!!accepted);
      setTosChecked(true);
    }
  }, [status, session]);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !session.user.avatarUrl && pathname !== "/settings") {
      router.replace("/settings");
    }
  }, [status, session, pathname, router]);

  function handleAccept() {
    if (!session?.user?.email) return;
    window.localStorage.setItem(tosKey(session.user.email), "true");
    setTosAccepted(true);
  }

  if (status === "loading" || status === "unauthenticated" || !session?.user) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  if (status === "authenticated" && tosChecked && !tosAccepted) {
    return <TosModal onAccept={handleAccept} />;
  }

  if (!session.user.avatarUrl && pathname !== "/settings") {
    return <LoadingSpinner label="Redirecting to complete your profile..." />;
  }

  return children;
}