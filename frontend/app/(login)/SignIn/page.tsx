"use client";

import { Button, Typography, OutlinedInput, Grid2, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./SignIn.module.scss";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/Shortener");
  };

  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      marginTop={"10%"}
      gap={2}
    >
      <Typography variant="h4">Вход</Typography>
      <OutlinedInput
        className={styles.input}
        label="Username"
        sx={{ width: { xs: "80%", sm: "20%" } }}
      />
      <OutlinedInput
        className={styles.input}
        label="Password"
        type="password"
        sx={{ width: { xs: "80%", sm: "20%" } }}
      />

      <Grid2 container gap={2} alignItems={"center"}>
        <Typography style={{ fontSize: 12 }}>
          Еще не зарегестрированы?
        </Typography>
        <Link href="/SignUp">
          <Typography
            style={{
              fontSize: 14,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Регистрация
          </Typography>
        </Link>{" "}
      </Grid2>

      <Button className={styles.btn} onClick={handleSignIn}>
        Войти
      </Button>
    </Grid2>
  );
}
