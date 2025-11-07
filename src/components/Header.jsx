"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  Globe,
  LogIn,
  LogOut,
  Menu,
  Search,
  Ticket,
  User,
  LayoutDashboard,
  Home as HomeIcon,
} from "lucide-react";
// import SearchBar from "../searchBar/searchBar"; // Assuming this component exists

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const [language, setLanguage] = useState("EN");
  const router = useRouter();

  //   const fetchNotifications = async (token) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notification/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setNotifications(response.data);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     setIsLogin(true);
  //     fetchNotifications(token);
  //   }
  // }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLogin(false);
    router.push("/auth/login");
  };

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
      {/* <Button variant="ghost" onClick={() => setIsSearchOpen(true)}>
        Booking Slide
      </Button> */}
      {isLogin && (
        <Button variant="ghost" asChild>
          <Link href="/user">Account</Link>
        </Button>
      )}
    </nav>
  );

  const ActionButtons = ({ isMobile = false }) => (
    <div
      className={
        isMobile
          ? "flex flex-col space-y-4 pt-8"
          : "hidden md:flex md:items-center md:space-x-2"
      }
    >
      {/* <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
        <Search className="h-5 w-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setLanguage("EN")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setLanguage("KH")}>
            Khmer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      {isLogin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((noti) => (
                <DropdownMenuItem
                  key={noti.id}
                  onClick={() =>
                    router.push(`/booking/request/${noti.bookingId}`)
                  }
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <p className="font-semibold capitalize text-primary">
                      {noti.notificationType.replace("_", " ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {noti.notificationMessage}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(noti.notificationDate).toLocaleDateString()}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/user/notificationList")}
              className="font-semibold justify-center cursor-pointer"
            >
              See all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {isLogin ? (
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href="/auth/login">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </Button>
      )}
    </div>
  );

  return (
    <>
      <header className="sticky px-8 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl text-yellow-400 font-bold text-primary"
          >
            EBIN TAXI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLinks />
          </div>
          <ActionButtons />

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
                  <SheetTitle className="text-primary">Ebin Taxi</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <NavLinks isMobile />
                  <ActionButtons isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 pt-24">
            {/* <SearchBar /> */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6"
              onClick={() => setIsSearchOpen(false)}
            >
              <span className="sr-only">Close search</span>X
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
