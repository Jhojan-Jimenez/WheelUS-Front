import React from "react";
import Link from "../ui/Link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex mr-4">
      <img
        src="/logo.png"
        className="mr-3 h-8 bg-slate-500"
        alt="FlowBite Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap">
        WheelUS
      </span>
    </Link>
  );
};

export default Logo;
