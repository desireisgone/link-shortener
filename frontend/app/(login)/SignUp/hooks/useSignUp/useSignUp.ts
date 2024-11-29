import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpFormFields } from "../../types";
import { FormikHelpers } from "formik";
import { authService } from "@/services";
import { setAuthToken } from "@/services/Auth/Auth";
import { useToggle } from "@/hooks/useToggle";

export function useSignUp() {
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = useToggle();

  const router = useRouter();

  async function handleSignUp(
    values: SignUpFormFields,
    { setSubmitting }: FormikHelpers<SignUpFormFields>
  ) {
    setError("");

    try {
      const response = await authService.postSignUpUser(
        values.email,
        values.password
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setAuthToken(token);

      console.log("SignUp successful", response.data);
      router.push("/Shortener");
    } catch (err) {
      const errorMessage = "Произошла ошибка при регистрации";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
      setOpenAlert();
    }
  }

  return { handleSignUp, openAlert, setOpenAlert, error };
}
