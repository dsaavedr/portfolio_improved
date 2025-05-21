import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image width={50} height={50} src="/logo-plain.svg" priority alt="Logo" />
  );
};

export default Logo;
