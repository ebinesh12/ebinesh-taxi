"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavLinks = ({ isMobile = false }) => (
  <nav
    className={
      isMobile
        ? "flex flex-col space-y-4 text-lg"
        : "hidden md:flex md:items-center md:space-x-4"
    }
  >
    <Button variant="ghost" asChild>
      <Link href="/">Home</Link>
    </Button>
    <Button variant="ghost" asChild>
      <Link href="/booking-ride">Booking</Link>
    </Button>
  </nav>
);

const Header = () => {
  return (
    <>
      <header className="sticky px-8 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="tracking-wider text-xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700 font-bold"
          >
            EBIN TAXI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLinks />
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                    Ebin Taxi
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <NavLinks isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
