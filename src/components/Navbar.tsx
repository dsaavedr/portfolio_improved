import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

type Props = {
  className?: string;
};

const Navbar = ({ className }: Props) => {
  return (
    <header className={cn("sticky top-0 z-50 px-4 pb-4", className)}>
      <div className='fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg'></div>
      <div className='max-w-container relative mx-auto'>
        <nav data-slot='navbar' className='flex items-center, justify-between py-4'>
          <nav data-slot='navbar-left' className='flex items-center justify-start, gap-4'>
            <Link href='/'>Logo</Link>
          </nav>
          <nav data-slot='navbar-right' className='flex items-center justify-end, gap-4'>
            <DarkModeToggle />
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
