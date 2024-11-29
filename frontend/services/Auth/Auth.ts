import { AUTH_ROUTES } from "@/routes";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export function setAuthToken(token: string | null) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

async function postSignUpUser(
  email: string,
  password: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `http://localhost:8080${AUTH_ROUTES.SignUp}`,
      {
        email: email.toLowerCase(),
        password,
      }
    );
    return response;
  } catch (error) {
    console.error("SignInfffff", error);
    throw error;
  }
}

async function postSignInUser(
  email: string,
  password: string
): Promise<AxiosResponse> {
  try {
    const response = await axiosInstance.post(
      `http://localhost:8080${AUTH_ROUTES.SignIn}`,
      {
        email: email.toLowerCase(),
        password,
      }
    );
    return response;
  } catch (error) {
    console.error("SignUpfffff", error);
    throw error;
  }
}

export const authService = {
  postSignInUser,
  postSignUpUser,
};
