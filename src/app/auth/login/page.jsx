"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/services/schema";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

export default function LoginForm() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const res = await axios.post("/api/v1/signin", data);

      if (res.status === 200 && res.data.user) {
        dispatch(setUser(res.data.user));
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = "/admin";
        // router.push("/admin");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message || "Login failed. Please try again.",
        );
      } else {
        setServerError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Card className="md:w-1/3 bg-white/40 dark:bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
              "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400",
            )}
          >
            Login to Your Account
          </span>
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300",
              "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400",
            )}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          I don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className={cn(
              "font-semibold bg-clip-text text-transparent hover:underline",
              "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400",
            )}
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
