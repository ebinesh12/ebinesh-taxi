"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Car,
  Navigation,
  IndianRupee,
  Image as ImageIcon,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Repeat,
} from "lucide-react";

import { addVehicle } from "../actions";
import { addVehicleSchema } from "@/services/schema";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddVehiclePage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      name: "",
      service_type: "One-Way",
      rate_per_km: undefined,
      base_fare: undefined,
      status: "ACTIVE",
      vehicle_image: undefined,
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "vehicle_image" && value?.[0]) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    const result = await addVehicle(formData);

    if (result?.error) {
      toast.error("Telemetry Sync Failed", { description: result.error });
    } else {
      toast.success("Asset added to fleet database");
      router.push("/admin/vehicles");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl px-4 pt-10"
      >
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-amber-400 hover:text-slate-950 transition-colors rounded-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Fleet
        </Button>

        <Card className="border-none shadow-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
          <div className="h-1.5 w-full bg-amber-400" />

          <CardHeader className="p-8 md:p-12 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-400 p-2 rounded-xl">
                <Car className="h-6 w-6 text-slate-950" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Asset Registration
              </span>
            </div>
            <CardTitle className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
              Add New <span className="text-amber-500">Vehicle</span>
            </CardTitle>
            <CardDescription className="text-base font-medium">
              Initialize a new asset into the dispatch telemetry system.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 md:p-12 pt-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {/* Vehicle Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Asset Designation
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            <Input
                              placeholder="e.g., Toyota Camry Hybrid"
                              className="pl-10 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                      </FormItem>
                    )}
                  />

                  {/* Service Type */}
                  <FormField
                    control={form.control}
                    name="service_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Dispatch Class
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-zinc-800">
                            <SelectItem value="One-Way" className="py-3">
                              <div className="flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-amber-500" />
                                <span className="font-bold">One-Way</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Round-Trip" className="py-3">
                              <div className="flex items-center gap-2">
                                <Repeat className="h-4 w-4 text-amber-500" />
                                <span className="font-bold">Round-Trip</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                      </FormItem>
                    )}
                  />

                  {/* Rate Per KM */}
                  <FormField
                    control={form.control}
                    name="rate_per_km"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Rate per KM (INR)
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-10 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                      </FormItem>
                    )}
                  />

                  {/* Base Fare */}
                  <FormField
                    control={form.control}
                    name="base_fare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Base Dispatch Rate
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-10 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Telemetry Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700">
                              <SelectValue placeholder="Set status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-zinc-800">
                            <SelectItem value="ACTIVE" className="py-3">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span className="font-bold">Active Fleet</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="INACTIVE" className="py-3">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-rose-500" />
                                <span className="font-bold">Maintenance</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload */}
                  <FormField
                    control={form.control}
                    name="vehicle_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Profile Image
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors pointer-events-none" />
                            <Input
                              type="file"
                              accept="image/*"
                              className="pl-10 py-2 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700 cursor-pointer file:text-[10px] file:uppercase file:font-black file:tracking-widest file:bg-zinc-200 dark:file:bg-zinc-700 file:border-none file:rounded-md file:px-2 file:h-full file:mr-4 hover:file:bg-amber-400"
                              {...form.register("vehicle_image")}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Authorized Fleet Operation
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.back()}
                      className="flex-1 sm:flex-none h-14 px-8 rounded-2xl font-bold uppercase tracking-widest text-[10px]"
                    >
                      Discard
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="flex-1 sm:flex-none h-14 px-10 rounded-2xl bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-black uppercase tracking-tighter italic text-base shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Confirm Asset"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
