"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/SignIn");
  // });

  // useEffect(() => {
  //   router.push("/Shortener");
  // }, [router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
