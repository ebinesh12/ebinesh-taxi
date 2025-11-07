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

/*-------------------------------------------------------------------------------*/
