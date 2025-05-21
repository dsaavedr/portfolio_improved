import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

type Props = {
  className?: string;
};

const Navbar = ({ className }: Props) => {
  return (
    <header className={cn("sticky top-0 z-50 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-7xl">
        <nav
          data-slot="navbar"
          className="items-center, flex justify-between py-4"
        >
          <nav
            data-slot="navbar-left"
            className="justify-start, flex items-center gap-4"
          >
            <Link href="/">
              <Logo />
            </Link>
            <NavigationMenu className="ml-10">
              <NavigationMenuList className="flex items-center gap-5">
                <NavigationMenuItem>
                  <Link href="">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About me
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>My projects</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-6 md:w-[400px] lg:w-[500px]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Expedita sint nam aspernatur placeat corrupti. Dicta totam
                    deserunt corporis doloremque ab.
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact me
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <nav
            data-slot="navbar-right"
            className="justify-end, flex items-center gap-4"
          >
            <DarkModeToggle />
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
