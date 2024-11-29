"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useShort } from "../Shortener/components/MainInput/hooks/useShort";

export default function DynamicPage() {
  const { handleGetShortLink } = useShort()
  const uuidv4Pattern = useMemo(() => /^\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, []);
  const shortLink: string = usePathname();
  
  useEffect(() => {

    if (uuidv4Pattern.test(shortLink)) {
      handleGetShortLink("http://localhost:3000" + shortLink);
    }
  }, [])
}