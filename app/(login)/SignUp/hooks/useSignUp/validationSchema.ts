import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Email обязателен"),
  password: Yup.string().required("Пароль обязателен"),
});
