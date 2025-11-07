"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/services/schema"; // Adjust the import path
import { useRouter } from "next/navigation";
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

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await axios.post("/api/v1/signup", formData);

      if (res.status === 201) {
        router.push("/auth/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message || "Something went wrong on the server.",
        );
      } else {
        setServerError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Card className="md:w-1/3 bg-white/40 bg- dark:bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700">
      <CardHeader>
        <CardTitle>
          <span
            className={cn(
              "md:w-1/4 bg-clip-text text-transparent text-left font-semibold",
               "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400",
            )}
          >
            Create an Account
          </span>
        </CardTitle>
        <CardDescription>
          Enter your details below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
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
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className={cn(
              "font-semibold bg-clip-text text-transparent hover:underline",
              "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400",
            )}
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
