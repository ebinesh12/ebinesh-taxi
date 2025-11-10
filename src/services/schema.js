// 1. Define Zod schemas for validation
import * as z from "zod";

/*------------------- Contact Zod schemas for validation ----------------------------*/

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

/*------------------- Register Zod schemas for validation ----------------------------*/

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be no more than 20 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
});

/*---------------------- Register Zod schemas for validation---------------------*/

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

/*---------------------- Add Vehicle schemas for validation---------------------*/

// --- 1. Define the Zod schema for validation ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const addVehicleSchema = z.object({
  name: z.string().min(1, { message: "Vehicle name is required." }),
  service_type: z.enum(["One-Way", "Round-Trip"]),
  rate_per_km: z.coerce
    .number()
    .positive({ message: "Rate must be a positive number." }),
  base_fare: z.coerce
    .number()
    .positive({ message: "Base fare must be a positive number." }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  vehicle_image: z
    .any()
    .optional()
    .refine(
      (files) => !files?.[0] || files?.[0].size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => !files?.[0] || ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

/*---------------------- Edit Vehicle Zod schemas for validation---------------------*/

export const editVehicleSchema = z.object({
  name: z.string().min(1, { message: "Vehicle name is required." }),
  service_type: z.enum(["One-Way", "Round-Trip"]),
  rate_per_km: z.coerce
    .number()
    .positive({ message: "Rate must be a positive number." }),
  base_fare: z.coerce
    .number()
    .positive({ message: "Base fare must be a positive number." }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  vehicle_image: z
    .any()
    .optional()
});

/*---------------------- Ride Zod schemas for validation---------------------*/

// Zod schema for form validation
export const rideSchema = z
  .object({
    pickup: z.string().min(1, { message: "Pickup location is required." }),
    drop: z.string().min(1, { message: "Drop location is required." }),
    date: z.string().min(1, { message: "Date is required." }),
    time: z.string().min(1, { message: "Time is required." }),
  })
  .refine(
    (data) => {
      const selectedDate = new Date(`${data.date}T${data.time}`);
      const now = new Date();
      // Allow a few minutes of grace period for the time selection
      now.setMinutes(now.getMinutes() - 5);
      return selectedDate >= now;
    },
    {
      message: "Cannot select a past date or time.",
      path: ["time"],
    },
  );

/*---------------------- Verify Zod schemas for validation---------------------*/

// Zod schema for the customer details form
export const verifySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .optional()
    .or(z.literal("")),
});

/*---------------------- Search Zod schemas for validation---------------------*/

// Define a Zod schema for validating the search parameters
export const searchParamsSchema = z.object({
  pickup: z.string().min(1, "Pickup location is required."),
  drop: z.string().min(1, "Drop location is required."),
  serviceType: z.enum(["One-Way", "Round-Trip"]),
  date: z.string().optional(),
  time: z.string().optional(),
});

/*---------------------- Register Zod schemas for validation---------------------*/
/*-------------------------------------------------------------------------------*/
