import { zodResolver } from "@hookform/resolvers/zod";
import { ok } from "neverthrow";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../api/auth";
import ErrorInput from "../components/ErrorInput";
import type { FormValues } from "../schemas/register";
import { RegisterSchema } from "../schemas/register";
import styles from "./RegisterPage.module.css";

function RegisterPage(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const submit = async ({ email, password }: FormValues): Promise<void> => {
    const response = await registerRequest(email, password);

    response
      .andThen((data) => {
        navigate("/login");
        return ok(true);
      })
      .mapErr((e) => {
        setError(e.message);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="me@email.com"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <ErrorInput name="email" errors={errors} className={styles.error} />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          {...register("password", {
            min: 4,
          })}
        />
        <ErrorInput name="password" errors={errors} className={styles.error} />
        <label htmlFor="confirm">Confim Password: </label>
        <input
          id="confirm"
          type="password"
          placeholder="********"
          {...register("confirm")}
        />
        <ErrorInput name="confirm" errors={errors} className={styles.error} />
        <div className={styles.center}>
          <button type="submit">Login</button>
          <p className={styles.error}>{error}</p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
