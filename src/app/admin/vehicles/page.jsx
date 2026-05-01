"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Car, Search, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VehicleActions } from "./vehicle-actions";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const imagePreview = (vehicle_image) => {
    if (!vehicle_image) return null;
    try {
      const hex = vehicle_image?.substring(2);
      const uint8Array = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)),
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase.from("vehicles").select("*");
        if (error) throw new Error("Fleet telemetry unavailable.");
        setVehicles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
          Syncing Fleet Data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Badge className="bg-amber-400 text-slate-950 border-none font-bold uppercase tracking-tighter mb-2">
            Asset Management
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
            Vehicle <span className="text-amber-500">Fleet</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Control and maintain your active transportation assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search ID or Name..."
              className="pl-10 h-11 w-64 bg-white dark:bg-zinc-900 border-none shadow-sm rounded-xl"
            />
          </div>
          <Button
            asChild
            className="h-11 rounded-xl bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-black uppercase tracking-tighter italic px-6 shadow-lg shadow-amber-500/10"
          >
            <Link href="/admin/vehicles/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Asset
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden rounded-[2rem]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-zinc-800/50">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[100px] py-6 pl-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Preview
                  </TableHead>
                  <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Asset Detail
                  </TableHead>
                  <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Service Class
                  </TableHead>
                  <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Pricing / KM
                  </TableHead>
                  <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Base Rate
                  </TableHead>
                  <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Telemetry Status
                  </TableHead>
                  <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle, index) => (
                      <motion.tr
                        key={vehicle.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        <TableCell className="pl-8 py-4">
                          <div className="relative h-14 w-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                            {vehicle?.vehicle_image ? (
                              <Image
                                src={imagePreview(vehicle?.vehicle_image) ?? ""}
                                alt={vehicle.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <Car className="h-6 w-6 text-zinc-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                            {vehicle.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 font-mono uppercase">
                            ID: {vehicle?.id}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="rounded-md border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-tighter"
                          >
                            {vehicle.service_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          ₹{vehicle.rate_per_km.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-mono text-zinc-500">
                          ₹{vehicle.base_fare.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                vehicle.status === "ACTIVE"
                                  ? "bg-emerald-500 animate-pulse"
                                  : "bg-rose-500",
                              )}
                            />
                            <span
                              className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                vehicle.status === "ACTIVE"
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400",
                              )}
                            >
                              {vehicle.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="pr-8 text-right">
                          <VehicleActions vehicleId={vehicle.id} />
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground italic space-y-2">
                          <Car className="h-8 w-8 opacity-20" />
                          <p>No active units found in fleet database.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
