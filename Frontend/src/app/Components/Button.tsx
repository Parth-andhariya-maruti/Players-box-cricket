import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?(): void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  onClick,
  children,
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
