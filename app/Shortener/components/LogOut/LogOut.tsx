"use client";

import { Grid2, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export function LogOut() {
  const router = useRouter();

  return (
    <Grid2 container alignItems={"center"} justifyContent={"center"}>
      <IconButton onClick={() => router.push("/SignIn")}>
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/ios/50/exit--v1.png"
          alt="exit--v1"
        />
      </IconButton>
    </Grid2>
  );
}
