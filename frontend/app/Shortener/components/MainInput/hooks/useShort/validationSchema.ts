import * as Yup from "yup";

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export const validationSchemaLink = Yup.object({
  link: Yup.string()
    .matches(urlRegex, "Введите правильный URL (например, http://example.com)")
    .required("Поле обязательно для заполнения"),
});
