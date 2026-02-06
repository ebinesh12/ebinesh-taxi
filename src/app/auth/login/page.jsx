"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Loader2,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import { loginSchema } from "@/services/schema";
import { setUser } from "@/redux/userSlice";
import { cn } from "@/lib/utils";

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

export default function LoginForm() {
  const [serverError, setServerError] = useState("");
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
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message ||
            "Authentication failed. Access denied.",
        );
      } else {
        setServerError("Connection error. The dispatch server is unreachable.");
      }
    }
  };

  return (
    <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
      {/* Top Brand Accent */}
      <div className="h-1.5 w-full bg-amber-400" />

      <CardHeader className="space-y-1 pt-8 px-8">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Secure Terminal
          </span>
        </div>
        <CardTitle className="text-3xl font-black tracking-tighter uppercase italic dark:text-white">
          Admin <span className="text-amber-500">Login</span>
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-zinc-400 font-medium">
          Identify yourself to access the fleet dispatch system.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1"
            >
              Operator Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="name@taxi-fleet.com"
                className={cn(
                  "pl-10 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-amber-500",
                  errors.email && "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("email")}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <Label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-widest text-slate-500"
              >
                Access Key
              </Label>
              <Link
                href="#"
                className="text-[10px] font-bold text-amber-500 hover:underline uppercase tracking-tighter"
              >
                Forgot Key?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={cn(
                  "pl-10 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-amber-500",
                  errors.password &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("password")}
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message Alert */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-500 text-xs font-bold"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {serverError}
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-black uppercase tracking-tighter text-base shadow-xl shadow-amber-500/10 group transition-all active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                Initialize Dispatch
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pb-10 pt-6 px-8">
        <Separator className="bg-slate-100 dark:bg-zinc-800" />
        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
          New fleet manager?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-slate-900 dark:text-amber-500 hover:underline underline-offset-4"
          >
            Create Operator Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

const Separator = ({ className }) => (
  <div className={cn("h-[1px] w-full", className)} />
);
