import { LINK_ROUTES } from "@/routes";
import axios, { AxiosResponse } from "axios";

async function postCreateShortLink(
  originalLink: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `http://localhost:8080${LINK_ROUTES.Link}`,
      { link: originalLink },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("CreateLinkError", error);
    throw error;
  }
}

async function getShortLink(originalLink: string): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `http://localhost:8080${LINK_ROUTES.GetShortLink}`,
      { link: originalLink },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("CreateLinkError", error);
    throw error;
  }
}

export const linkService = {
  postCreateShortLink,
  getShortLink,
};
