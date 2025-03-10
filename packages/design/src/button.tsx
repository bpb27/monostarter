import { css } from "../styled-system/css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={css({ background: "ButtonFace", p: "4" })}>
      {children}
    </button>
  );
}
