"use client";

import { Button, Typography, OutlinedInput, Grid2 } from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  useShort,
  formInitialValues,
  validationSchemaLink,
} from "./hooks/useShort";
import { LinkShortFormFields } from "./types";
import styles from "./MainInput.module.scss";
import { StatusAlert } from "@/components/StatusAlert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export function MainInput() {
  const {
    handleShort,
    openAlert,
    setOpenAlert,
    error,
    shortLink,
    handleGetShortLink,
  } = useShort();

  const handleCopy = () => {
    if (shortLink) {
      navigator.clipboard.writeText(shortLink);
      alert("Ссылка скопирована в буфер обмена!");
    }
  };

  const handleLinkClick = () => {
    if (shortLink) {
      handleGetShortLink(shortLink);
    }
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleShort}
        validationSchema={validationSchemaLink}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid2
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              <Grid2 container sx={{ width: { sm: "500px", xs: "300px" } }}>
                <Field name="link">
                  {({ field }: FieldProps<LinkShortFormFields["link"]>) => (
                    <div style={{ width: "100%" }}>
                      <OutlinedInput
                        {...field}
                        placeholder="Введите ссылку для сокращения"
                        fullWidth
                        className={styles.input}
                      />
                      {touched.link && errors.link && (
                        <Typography color="error">{errors.link}</Typography>
                      )}
                    </div>
                  )}
                </Field>
              </Grid2>

              {shortLink && (
                <Grid2
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: 2 }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    onClick={handleLinkClick}
                    sx={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {shortLink}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCopy}
                    sx={{ marginLeft: 2 }}
                  >
                    <ContentCopyIcon />
                  </Button>
                </Grid2>
              )}

              <Grid2 container justifyContent="center" sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.btn}
                >
                  Сократить
                </Button>
              </Grid2>
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
