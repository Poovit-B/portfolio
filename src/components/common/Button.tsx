import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline:
      "border-2 border-accent text-accent hover:bg-accent hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
