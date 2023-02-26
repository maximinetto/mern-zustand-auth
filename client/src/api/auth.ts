import axios from "../lib/axios";

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const profileRequest = async () => {
  const response = await axios("/profile");

  return response.data;
};
