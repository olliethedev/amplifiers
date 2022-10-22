import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  text: string;
  type?: "large" | "small";
  className?: string;
}
const Error: React.FC<Props> = ({ text, type = "large", className }) => {
  const style = {
    small: {
      layout: "flex border border-yellow-600 bg-yellow-50 rounded " + className,
      icon: "h-10 w-10 text-yellow-500/50",
      topText: "hidden",
      bottomText: "body-light",
    },
    large: {
      layout:
        "card flex space-x-5 justify-center w-full hover:cursor-default border-2 border-red-200 rounded " +
        className,
      icon: "h-24 w-24 text-red-500/50",
      topText: "title-sm",
      bottomText: "body-light",
    },
  }[type];
  return (
    <div className={style.layout}>
      <ExclamationCircleIcon className={style.icon} />
      <div className="flex-grow flex flex-col justify-center">
        <p className={style.topText}>Error!</p>
        <div className={style.bottomText}>{text}</div>
      </div>
    </div>
  );
};

export default Error;
