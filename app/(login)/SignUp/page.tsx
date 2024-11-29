"use client";

import { Button, Typography, OutlinedInput, Grid2, Link } from "@mui/material";
import styles from "../SignIn/SignIn.module.scss";
import { SignUpSchema, useSignUp } from "./hooks/useSignUp";
import { Field, FieldProps, Form, Formik } from "formik";
import { formInitialValues } from "./hooks/useSignUp/initValues";
import { SignUpFormFields } from "./types";
import { StatusAlert } from "@/components/StatusAlert";

export default function SignIn() {
  const { handleSignUp, openAlert, setOpenAlert, error } = useSignUp();

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSignUp}
        validationSchema={SignUpSchema}
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
              <Typography variant="h4">Регистрация</Typography>
              <Field name="email">
                {({ field }: FieldProps<SignUpFormFields["email"]>) => (
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
                {({ field }: FieldProps<SignUpFormFields["password"]>) => (
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
                  Уже есть аккаунт?
                </Typography>
                <Link href="/SignIn">
                  <Typography
                    style={{
                      fontSize: 14,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Войти
                  </Typography>
                </Link>{" "}
              </Grid2>

              <Button className={styles.btn} type="submit">
                Зарегистрироваться
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
