"use client";

import { Button, Typography, OutlinedInput, Grid2, Link } from "@mui/material";
import styles from "./SignIn.module.scss";
import { useSignIn } from "./hooks/useSignIn/useSignIn";
import { Field, FieldProps, Form, Formik } from "formik";
import { formInitialValues } from "./hooks/useSignIn/initValues";
import { SignInFormFields } from "./types";
import { StatusAlert } from "@/components/StatusAlert";
import { SignInSchema } from "./hooks/useSignIn";

export default function SignIn() {
  const { handleSignIn, openAlert, setOpenAlert, error } = useSignIn();

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSignIn}
        validationSchema={SignInSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid2
              container
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              marginTop={"10%"}
              gap={2}
            >
              <Typography variant="h4">Вход</Typography>
              <Field name="email">
                {({ field }: FieldProps<SignInFormFields["email"]>) => (
                  <div>
                    <OutlinedInput
                      {...field}
                      className={styles.input}
                      placeholder="Email"
                    />
                    {touched.email && errors.email && (
                      <Typography color="error">{errors.email}</Typography>
                    )}
                  </div>
                )}
              </Field>

              <Field name="password">
                {({ field }: FieldProps<SignInFormFields["password"]>) => (
                  <div>
                    <OutlinedInput
                      {...field}
                      className={styles.input}
                      placeholder="Password"
                      type="password"
                    />
                    {touched.password && errors.password && (
                      <Typography color="error">{errors.password}</Typography>
                    )}
                  </div>
                )}
              </Field>

              <Grid2 container gap={2} alignItems={"center"}>
                <Typography style={{ fontSize: 12 }}>
                  Еще не зарегистрированы?
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
                </Link>
              </Grid2>

              <Button className={styles.btn} type="submit">
                Войти
              </Button>
            </Grid2>
          </Form>
        )}
      </Formik>

      <StatusAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        error={error}
      />
    </>
  );
}
