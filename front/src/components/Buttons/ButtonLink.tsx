import Link from "next/link";
import React from "react";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={`rounded bg-[#2E50EB] py-2 px-8 text-sm text-white font-bold hover:bg-[#5C77EF] active:bg-[#1437D1] cursor-pointer flex justify-center items-center ${className || ""}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
