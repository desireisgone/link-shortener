"use client";

import { setAuthToken } from "@/services/Auth/Auth";
import { useRouter, usePathname} from "next/navigation";
import React, { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    } else if (path !== "/SignUp") {
      router.push("/SignIn");
    }
  }, []);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
