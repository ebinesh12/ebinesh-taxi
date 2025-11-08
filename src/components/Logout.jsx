"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/v1/signout", { method: "POST" });

      if (res.ok) {
        dispatch(removeUser());
        router.push("/auth/login");
        router.refresh();
      } else {
        toast({
          title: "Logout failed",
          description: "Unable to logout. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during logout.",
        variant: "destructive",
      });
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoggingOut} variant="ghost" className="w-full justify-start">
      <LogOut className="mr-2 h-4 w-4" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
