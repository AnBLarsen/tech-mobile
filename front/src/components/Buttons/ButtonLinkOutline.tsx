import Link from "next/link";
import React from "react";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLinkOutline: React.FC<ButtonLinkProps> = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={`rounded border border-[#2E50EB] bg-transparent py-2 px-8 text-sm text-[#2E50EB] font-bold hover:bg-[#5C77EF] hover:text-white active:bg-[#1437D1] cursor-pointer flex justify-center items-center ${className || ""}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLinkOutline;