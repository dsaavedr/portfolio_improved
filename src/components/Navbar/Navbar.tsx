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
import {
  ChevronRightIcon,
  CircleUserRoundIcon,
  MenuIcon,
  MessageSquareCodeIcon,
  PresentationIcon,
  XIcon,
} from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getUser } from "@/auth/server";
import LogOutButton from "../LogOutButton/LogOutButton";

type Props = {
  className?: string;
};

const Navbar = async ({ className }: Props) => {
  const user = await getUser();

  return (
    <header className={className}>
      {/* Small viewports */}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mt-5 ml-5 lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <DialogTitle id="mobile-nav-title" className="sr-only">
          Navigation menu
        </DialogTitle>
        <SheetContent side="top">
          <div className="flex w-full justify-between px-7 pt-7 pb-3">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center gap-2">
              {user && <LogOutButton />}
              <DarkModeToggle />
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <XIcon className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetClose>
            </div>
          </div>
          <nav className="flex flex-col gap-2 px-4 py-6">
            <Link href="#" className="nav-link">
              Home
            </Link>
            <Link href="#" className="nav-link">
              About me
            </Link>
            <Link href="#" className="nav-link">
              My projects
            </Link>
            <Collapsible className="grid gap-2">
              <CollapsibleTrigger className="nav-link [&[data-state=open]>svg]:rotate-90">
                Dropdown
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent aria-describedby="mobile-nav-title">
                <div className="bg-accent -mx-6 grid gap-2 p-6">
                  <Link className="nav-link" href="#">
                    Link 1
                  </Link>
                  <Link className="nav-link" href="#">
                    Link 2
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Link href="#" className="nav-link">
              Contact me
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Large viewports */}

      <div className="fixed top-0 z-50 hidden w-full px-4 pb-4 lg:block">
        <nav
          data-slot="navbar"
          className="mx-auto flex max-w-7xl items-center justify-between py-4"
        >
          <nav
            data-slot="navbar-left"
            className="flex items-center justify-start gap-4"
          >
            <Link href="/">
              <Logo />
            </Link>
            <NavigationMenu className="ml-10">
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(navigationMenuTriggerStyle(), "bg-accent")}
                  >
                    <Link href="#" className="flex flex-row items-center gap-1">
                      <CircleUserRoundIcon
                        size={20}
                        className="text-muted-foreground size-5"
                      />
                      <span>About me</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-accent flex-row items-center gap-1">
                    <PresentationIcon
                      size={20}
                      className="text-muted-foreground size-5"
                    />
                    <span>My projects</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-6 md:w-[400px] lg:w-[500px]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Expedita sint nam aspernatur placeat corrupti. Dicta totam
                    deserunt corporis doloremque ab.
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(navigationMenuTriggerStyle(), "bg-accent")}
                  >
                    <Link href="#" className="flex flex-row items-center gap-1">
                      <MessageSquareCodeIcon
                        size={20}
                        className="text-muted-foreground size-5"
                      />
                      <span>Contact me</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-accent">
                    Other dropdown
                  </NavigationMenuTrigger>
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
            className="flex items-center justify-end gap-4"
          >
            {user && <LogOutButton />}
            <DarkModeToggle />
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
