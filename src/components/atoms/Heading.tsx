import { ReactNode, createElement } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function Heading({
  children,
  level = 1,
  className = "",
}: HeadingProps) {
  const baseStyles = "font-bold text-gray-900 dark:text-white";

  const sizeStyles: Record<number, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  return createElement(
    `h${level}`,
    { className: `${baseStyles} ${sizeStyles[level]} ${className}` },
    children
  );
}
