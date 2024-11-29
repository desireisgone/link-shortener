import { useState } from "react";
import { LinkShortFormFields } from "../../types";
import { FormikHelpers } from "formik";
import { linkService } from "@/services/Link";
import { useToggle } from "@/hooks/useToggle";
import { useRouter } from "next/navigation";

export function useShort() {
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = useToggle();
  const [shortLink, setShortLink] = useState<string>("");
  const router = useRouter();

  async function handleShort(
    values: LinkShortFormFields,
    { setSubmitting }: FormikHelpers<LinkShortFormFields>
  ) {
    setError("");
    if (values.link !== "") {
      try {
        const response = await linkService.postCreateShortLink(values.link);
        setShortLink(response.data.link);
      } catch (err) {
        const errorMessage = "Произошла ошибка";
        setError(errorMessage);
        setOpenAlert();
      } finally {
        setSubmitting(false);
      }
    }
  }

  async function handleGetShortLink(link: string) {
    setError("");
    try {
      const response = await linkService.getShortLink(link);
      router.replace(response.data.link);
    } catch (err) {
      const errorMessage = "Произошла ошибка";
      setError(errorMessage);
    }
  }

  return {
    handleShort,
    handleGetShortLink,
    openAlert,
    setOpenAlert,
    error,
    shortLink,
  };
}
