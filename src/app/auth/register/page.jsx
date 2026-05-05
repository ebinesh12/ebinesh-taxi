"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Loader2,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Fingerprint,
} from "lucide-react";

import { registerSchema } from "@/services/schema";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
        toast.success("Registration successful! Verify Mail, then Log in.", {
          style: { background: "#10b981", color: "#fff" },
        });
        router.push("/auth/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.message ||
            "Onboarding failed. Please check your credentials.",
        );
      } else {
        setServerError("Dispatch server unavailable. Please try again later.");
      }
    }
  };

  return (
    <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
      {/* Top Brand Accent */}
      <div className="h-1.5 w-full bg-amber-400" />

      <CardHeader className="space-y-1 pt-8 px-8">
        <div className="flex items-center gap-2 mb-2">
          <UserPlus className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Operator Onboarding
          </span>
        </div>
        <CardTitle className="text-3xl font-black tracking-tighter uppercase italic dark:text-white">
          Join the <span className="text-amber-500">Fleet</span>
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-zinc-400 font-medium">
          Establish your credentials to join our dispatch network.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Username Field */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
              Operator ID (Username)
            </Label>
            <div className="relative group">
              <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <Input
                placeholder="operator_01"
                className={cn(
                  "pl-10 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-amber-500",
                  errors.username && "border-red-500",
                )}
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-[10px] font-bold uppercase ml-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
              Official Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <Input
                type="email"
                placeholder="name@taxi-fleet.com"
                className={cn(
                  "pl-10 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-amber-500",
                  errors.email && "border-red-500",
                )}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] font-bold uppercase ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
              Security Passcode
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <Input
                type="password"
                placeholder="Minimum 8 characters"
                className={cn(
                  "pl-10 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-amber-500",
                  errors.password && "border-red-500",
                )}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold uppercase ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Alert */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
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
            className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-black uppercase tracking-tighter text-base shadow-xl shadow-amber-500/10 group transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                Join the Fleet
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pb-10 pt-6 px-8">
        <div className="h-[1px] w-full bg-slate-100 dark:bg-zinc-800" />
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
          <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
            Already registered?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-slate-900 dark:text-amber-500 hover:underline"
            >
              Log In
            </Link>
          </p>
          <div className="flex items-center gap-1.5 opacity-50">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Protected Data
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
