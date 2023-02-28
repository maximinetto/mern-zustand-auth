import { ErrorMessage } from "@hookform/error-message";
import type { FieldErrors } from "react-hook-form";

interface Props<T extends FieldErrors = FieldErrors> {
  errors: T;
  name: string;
  className?: string;
}

function ErrorInput({ errors, name, className }: Props): JSX.Element | null {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p className={className}>{message}</p>}
    />
  );
}

export default ErrorInput;
