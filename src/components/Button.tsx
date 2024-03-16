import React from "react";

interface IProps {
  className?: string;
  title: string;
}
const Button = ({ className, title }: IProps) => {
  return (
    <button
      className={`${className}block mx-auto mt-4 py-2 px-8 hover:scale-105 transition-transform border border-red-600 rounded-sm`}
    >
      {title}
    </button>
  );
};

export default Button;
