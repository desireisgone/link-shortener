import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInFormFields } from "../../types";
import { FormikHelpers } from "formik";
import { authService } from "@/services";
import { useToggle } from "@/hooks/useToggle";

export function useSignIn() {
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = useToggle();
  const router = useRouter();

  async function handleSignIn(
    values: SignInFormFields,
    { setSubmitting }: FormikHelpers<SignInFormFields>
  ) {
    setError("");

    try {
      await authService.postSignInUser(values.email, values.password);
      router.push("/Shortener");
    } catch (err) {
      const errorMessage = "Произошла ошибка при входе";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
      setOpenAlert();
    }
  }

  return { handleSignIn, openAlert, setOpenAlert, error };
}
