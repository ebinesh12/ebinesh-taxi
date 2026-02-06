"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Settings2,
  Car,
  Navigation,
  IndianRupee,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Repeat,
  Info,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import { updateVehicle } from "../../actions";
import { editVehicleSchema } from "@/services/schema";
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
import { Badge } from "@/components/ui/badge";

export default function EditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [imagePreview, setImagePreview] = useState();

  const form = useForm({
    resolver: zodResolver(editVehicleSchema),
    defaultValues: {
      name: "",
      service_type: "One-Way",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (!id) {
      setError("Asset ID identification failure.");
      setLoading(false);
      return;
    }

    const fetchVehicle = async () => {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw new Error("Telemetry sync failed: Asset not found.");

        if (data) {
          form.reset(data);
          if (data.vehicle_image) {
            const hex = data.vehicle_image.substring(2);
            const uint8Array = new Uint8Array(
              hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)),
            );
            const blob = new Blob([uint8Array]);
            setImagePreview(URL.createObjectURL(blob));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, form]);

  const imageFile = form.watch("vehicle_image");

  useEffect(() => {
    if (imageFile instanceof FileList && imageFile.length > 0) {
      const file = imageFile[0];
      const newPreviewUrl = URL.createObjectURL(file);
      setImagePreview(newPreviewUrl);
      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [imageFile]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("id", id);
    Object.entries(values).forEach(([key, value]) => {
      if (key === "vehicle_image" && value?.[0]) {
        formData.append(key, value[0]);
      } else if (key !== "vehicle_image") {
        formData.append(key, String(value));
      }
    });

    const result = await updateVehicle(formData);

    if (result?.error) {
      toast.error("Update sequence failed", { description: result.error });
    } else {
      toast.success("Asset telemetry updated successfully");
      router.push("/admin/vehicles");
    }
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
          Syncing Asset Data
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="bg-rose-500/10 p-4 rounded-full mb-4">
          <XCircle className="h-8 w-8 text-rose-500" />
        </div>
        <h2 className="text-xl font-bold mb-2 uppercase tracking-tighter italic">
          System Error
        </h2>
        <p className="text-zinc-500 text-sm mb-6">{error}</p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="rounded-xl font-bold uppercase tracking-widest text-[10px]"
        >
          Abort Sequence
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-5xl px-4 pt-10"
      >
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-amber-400 hover:text-slate-950 transition-colors rounded-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Fleet
          </Button>
          <Badge
            variant="outline"
            className="border-amber-500/30 text-amber-500 font-mono text-[10px]"
          >
            UUID: {id.slice(0, 18)}...
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: The Form */}
          <Card className="lg:col-span-7 border-none shadow-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
            <div className="h-1.5 w-full bg-amber-400" />
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Settings2 className="h-5 w-5 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Configuration
                </span>
              </div>
              <CardTitle className="text-3xl font-black tracking-tighter uppercase italic dark:text-white">
                Modify <span className="text-amber-500">Asset</span>
              </CardTitle>
              <CardDescription className="text-sm font-medium">
                Updating telemetry for unit:{" "}
                <span className="text-zinc-900 dark:text-zinc-100 italic">
                  {form.getValues("name")}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Asset Designation
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-amber-500 transition-colors" />
                              <Input
                                className="pl-10 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border-slate-200 dark:border-zinc-700"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold uppercase" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Dispatch Class
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="One-Way">
                                <div className="flex items-center gap-2">
                                  <ArrowRight className="h-3 w-3 text-amber-500" />
                                  One-Way
                                </div>
                              </SelectItem>
                              <SelectItem value="Round-Trip">
                                <div className="flex items-center gap-2">
                                  <Repeat className="h-3 w-3 text-amber-500" />
                                  Round-Trip
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rate_per_km"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Rate / KM (INR)
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-amber-500" />
                              <Input
                                type="number"
                                step="0.01"
                                className="pl-10 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="base_fare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Base Dispatch Rate
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-amber-500" />
                              <Input
                                type="number"
                                step="0.01"
                                className="pl-10 h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Operation Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="ACTIVE">
                                <div className="flex items-center gap-2 font-bold text-emerald-500">
                                  <CheckCircle2 className="h-4 w-4" /> Active
                                  Fleet
                                </div>
                              </SelectItem>
                              <SelectItem value="INACTIVE">
                                <div className="flex items-center gap-2 font-bold text-rose-500">
                                  <XCircle className="h-4 w-4" /> Maintenance
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800 gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-400 tracking-widest">
                      <Info className="h-3 w-3 text-amber-500" /> Syncing to
                      Dispatch
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="rounded-xl font-bold uppercase tracking-widest text-[10px]"
                      >
                        Discard
                      </Button>
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="h-12 px-8 bg-slate-900 dark:bg-amber-400 dark:text-slate-950 rounded-xl font-black uppercase tracking-tighter italic shadow-xl shadow-amber-500/20"
                      >
                        {form.formState.isSubmitting ? (
                          <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                          "Commit Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* RIGHT COLUMN: The Visual Profile */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-none shadow-xl bg-zinc-900 text-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Asset Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white/10 group bg-black/40">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Asset"
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-700"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-zinc-600">
                      <Car className="h-12 w-12 mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        No Profile Loaded
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge className="bg-amber-400 text-slate-950 border-none font-bold uppercase text-[9px]">
                      {form.watch("service_type")}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-white border-white/20 uppercase text-[9px]"
                    >
                      {form.watch("status")}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Replace Telemetry Image
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl file:bg-amber-400 file:text-slate-950 file:border-none file:rounded-md file:text-[10px] file:font-black file:uppercase file:px-3 file:mr-4 file:h-full cursor-pointer"
                    {...form.register("vehicle_image")}
                  />
                  <p className="text-[9px] text-zinc-500 italic leading-relaxed">
                    Recommended: 800x600px, WebP or JPEG formats. High contrast
                    images work best for dispatcher visualization.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-[2rem] bg-amber-400/5 border border-amber-400/10 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
                <Info className="h-4 w-4" /> Asset Notes
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed italic">
                Modifying dispatch rates will immediately affect all customer
                fare estimations for new bookings. Unit ID remains constant for
                telemetry logging.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
