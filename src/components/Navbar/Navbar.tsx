import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import Logo from "../Logo/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

type Props = {
  className?: string;
};

const Navbar = ({ className }: Props) => {
  return (
    <header className={cn("sticky top-0 z-50 px-4 pb-4", className)}>
      <div className="mx-auto max-w-7xl">
        <nav
          data-slot="navbar"
          className="flex items-center justify-between py-4"
        >
          <nav
            data-slot="navbar-left"
            className="flex items-center justify-start gap-4"
          >
            <Link href="/">
              <Logo />
            </Link>
            <NavigationMenu className="ml-10">
              <NavigationMenuList className="">
                <NavigationMenuItem>
                  <Link href="" passHref>
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
                  <Link href="" passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact me
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Other dropdown</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-6 md:w-[400px] lg:w-[500px]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Expedita sint nam aspernatur placeat corrupti. Dicta totam
                    deserunt corporis doloremque ab.
                  </NavigationMenuContent>
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
