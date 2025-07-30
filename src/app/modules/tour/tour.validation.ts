import { z } from "zod";

export const createTourZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  costFrom: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  tourType: z.string(),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  amenities: z.array(z.string()),
  tourPlan: z.array(z.string()),
  maxGuests: z.number(),
  minAge: z.number(),
  division: z.string(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
});

export const updateTourZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  tourType: z.string().optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(), // ✅ fixed typo
  tourPlan: z.array(z.string()).optional(),
  maxGuest: z.number().optional(), // ✅ matched with your schema
  minAge: z.number().optional(),
});

export const createTourTypeZodSchema = z.object({
  name: z.string(),
});
export const updateTourTypeZodSchema = z.object({
  name: z.string(),
});
