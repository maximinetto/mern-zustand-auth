import axios from "axios";
import { err, ok, type Result } from "neverthrow";
import request from "../lib/axios";
import type { Profile } from "../store/auth";

export const loginRequest = async (
  email: string,
  password: string
): Promise<Result<{ token: string }, Error | { message: string }>> => {
  try {
    const response = await request.post("/login", {
      email,
      password,
    });

    return ok(response.data);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error?.response != null) {
      return err(error.response.data as { message: string });
    }

    return error instanceof Error
      ? err(error)
      : err(new Error("Something was wrong"));
  }
};

export const profileRequest = async (): Promise<
  Result<
    {
      message: string;
      profile: Profile;
    },
    Error | { message: string }
  >
> => {
  try {
    const response = await request("/profile");

    return ok(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error?.response != null) {
      return err(error.response.data as { message: string });
    }

    return error instanceof Error
      ? err(error)
      : err(new Error("Something was wrong"));
  }
};
