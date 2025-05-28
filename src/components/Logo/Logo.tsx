import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="h-[50px] w-[50px]"
      width={50}
      height={50}
      src="/logo-plain.svg"
      priority
      alt="Logo"
    />
  );
};

export default Logo;
